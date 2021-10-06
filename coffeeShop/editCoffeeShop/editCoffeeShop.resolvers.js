import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShopUtils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        const oldShop = await client.coffeeShop.findFirst({
          //findFirst를 쓰면 기준에 맞는 첫 번째 사진을 찾아줌
          where: { id, userId: loggedInUser.id },
          //id가 일치하고 userId도 일치하는 첫 번째 커피숍 찾기
          include: {
            categories: { select: { name: true } },
          },
        });
        if (!oldShop) {
          return {
            ok: false,
            error: "Can't edit this post",
          };
        }

        await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            latitude,
            longitude,
            categories: {
              disconnect: oldShop.categories,
              connectOrCreate: processCategories(categories),
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

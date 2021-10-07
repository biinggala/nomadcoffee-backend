import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShopUtils";
import { createWriteStream } from "fs";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, photos, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        let categoryObj = [];
        if (categories) {
          categoryObj = processCategories(categories);
        }
        let photoUrl = null;
        if (photos) {
          const { filename, createReadStream } = await photos; //avatarURL은 promise 함수이기 때문에 await 사용
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/coffeeShop/" + newFilename
          ); //사진 파일을 /uploads에 저장
          readStream.pipe(writeStream);
          photoUrl = `http://localhost:4000/static/${newFilename}`;
        }
        await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            ...(photoUrl && { photos: { create: { url: photoUrl } } }),
            user: { connect: { id: loggedInUser.id } },
            ...(categoryObj.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

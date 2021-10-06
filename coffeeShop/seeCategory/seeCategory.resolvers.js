import client from "../../client";

export default {
  Query: {
    seeCategory: (_, { name, lastId }) =>
      client.coffeeShop.findMany({
        where: { categories: { some: { name } } },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

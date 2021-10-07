import client from "../../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { lastId }) =>
      client.coffeeShop.findMany({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

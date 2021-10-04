import client from "../client";

export default {
  //database에 존재하지 않는 computed fileds의 resolver
  User: {
    totalFollowing: (
      { id } //root는 User.
    ) => client.user.count({ where: { followers: { some: { id } } } }), //follower에 내가 있으면 내가 following 하는 사람.

    totalFollowers: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),

    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return true;
      }
      return id === loggedInUser.id;
    },

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.user.count({
        where: { id: loggedInUser.id, following: { some: { id } } }, //some은 일부 조건만 만족하면 될 때 사용
      }); //로그인된 사용자인 동시에 root의 id를 팔로우하고 있는가. 결과는 1 아니면 0
      return Boolean(ok);
    },

    following: async ({ id }, { lastId }) =>
      await client.user.findUnique({ where: { id } }).following({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),

    followers: async ({ id }, { lastId }) =>
      await client.user.findUnique({ where: { id } }).followers({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

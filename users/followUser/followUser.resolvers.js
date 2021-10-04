import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const toFollowUser = await client.user.findUnique({
        where: { username },
      });
      if (!toFollowUser) {
        return {
          ok: false,
          error: "User does not exist.",
        };
      }
      await client.user.update({
        where: { id: loggedInUser.id }, //로그인한 아이디의 상태를 업데이트
        data: { following: { connect: { username } } },
      });
      return {
        ok: true,
      };
    }),
  },
};

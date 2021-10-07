import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const toUnfollowUser = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (!toUnfollowUser) {
          return { ok: false, error: "User does not exist." };
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: { disconnect: { username } },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

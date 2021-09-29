import client from "../client";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, avatarURL, githubUsername, password }
    ) => {
      //username과 email이 이미 존재하는지 확인
      const existingUser = await client.user.findFirst({
        where: { OR: [{ username }, { email }] },
      });
      if (existingUser) {
        return { ok: false, error: "Existing user." };
      }
      //password를 암호화
      const uglyPassword = await bcrypt.hash(password, 10);
      client.user.create({
        data: {
          username,
          email,
          name,
          avatarURL,
          githubUsername,
          password: uglyPassword,
        },
      });
      return {
        ok: true,
      };
    },
  },
};

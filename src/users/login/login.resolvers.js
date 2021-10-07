import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      //username 찾는다.
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      //user의 암호화된 password를 비교한다.
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      //토큰을 발행하여 로그인한다.
      const token = await jwt.sign({ id: user.id }, process.env.SECRETE_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};

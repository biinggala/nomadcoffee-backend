import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRETE_KEY); //context에서 받은 token을 verify
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver =  //함수를 리턴하는 함수. currying. ourResolver를 리턴하기 전 조건을 추가해주기 위함
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "You need to login.",
      };
    }
    return ourResolver(root, args, context, info);
  };

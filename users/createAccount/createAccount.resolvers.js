import client from "../../client";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, avatarURL, githubUsername, password }
    ) => {
      try {
        //username과 email이 이미 존재하는지 확인
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (existingUser) {
          throw new Error("This username or password is already taken.");
        }
        //password를 암호화
        const uglyPassword = await bcrypt.hash(password, 10);
        client.user.create({
          data: {
            username,
            email,
            ...(name & { name }), //"spread operator"
            ...(avatarURL & { avatarURL }),
            ...(githubUsername & { githubUsername }),
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        //혹시 모를 에러에 대비해 async 함수에는 try-catch 구문을 써주는 것이 좋다.
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { createWriteStream } from "fs";

const resolverFn = async (
  _,
  { username, email, name, avatarURL, githubUsername, password: newPassword },
  { loggedInUser }
) => {
  let avatarLink = null;
  if (avatarURL) {
    const { filename, createReadStream } = await avatarURL; //avatarURL은 promise 함수이기 때문에 await 사용
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    ); //사진 파일을 /uploads에 저장
    readStream.pipe(writeStream);
    avatarLink = `http://localhost:4000/static/${newFilename}`;
  }

  let uglyPassword = null; //uglyPassword가 있는 경우에만 데이터 업데이트를 해야함
  if (newPassword) {
    //password 변경시 암호화해야함
    uglyPassword = await bcrypt.hash(password, 10);
  }
  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      username,
      email,
      name,
      ...(avatarLink && { avatarURL: avatarLink }),
      githubUsername,
      ...(uglyPassword && { newPassword: uglyPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

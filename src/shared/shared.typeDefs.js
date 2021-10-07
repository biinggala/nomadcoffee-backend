import { gql } from "apollo-server-core";
import { createWriteStream } from "fs";

export default gql`
  type MutationResult {
    ok: Boolean!
    error: String
  }
`;

export const uploadPhoto = async (url) => {
  const { filename, createReadStream } = await url; //avatarURL은 promise 함수이기 때문에 await 사용
  const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = createWriteStream(
    process.cwd() + "/uploads/" + newFilename
  ); //사진 파일을 /uploads에 저장
  readStream.pipe(writeStream);
  avatarLink = `http://localhost:4000/static/${newFilename}`;
};

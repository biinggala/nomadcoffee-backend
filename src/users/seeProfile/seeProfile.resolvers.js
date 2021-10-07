import client from "../../client";

export default {
  Query: {
    seeProfile: async (_, { username }) =>
      client.user.findUnique({
        where: { username },
        include: { followers: true, following: true }, //list 결과는 데이터가 많을 수 있어 보호 차원에서 query에 안 뜸. 따로 활성화시캬줘야 함
      }),
  },
};

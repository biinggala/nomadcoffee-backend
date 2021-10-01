import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String
      avatarURL: String
      githubUsername: String
      password: String!
    ): mutationResult!
  }
`;

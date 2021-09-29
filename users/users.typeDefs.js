import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String!
    createdAt: String!
    updatedAt: String!
  }
  type createAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      avatarURL: String
      githubUsername: String!
      password: String!
    ): createAccountResult!
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
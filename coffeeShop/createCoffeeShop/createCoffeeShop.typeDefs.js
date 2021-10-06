import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      photos: Upload!
      latitude: String!
      longitude: String!
      categories: [String]
    ): MutationResult!
  }
`;

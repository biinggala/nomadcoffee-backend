import { gql } from "apollo-server-core";

export default gql`
  type mutationResult {
    ok: Boolean!
    error: String
  }
`;

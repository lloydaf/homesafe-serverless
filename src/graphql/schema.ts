import { gql } from 'apollo-server-lambda';
export const schema = gql`
  type User {
    firstName: String
    username: String!
    expoToken: String
  }
  type Query {
    getUsers: [User]
  }
`;
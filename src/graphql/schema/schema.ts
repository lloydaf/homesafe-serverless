import { gql } from 'apollo-server-lambda';
export const schema = gql`
  type User {
    fullName: String
    username: String
    expoToken: String
    phoneNumber: String
  }

  type Query {
    user(username: String!): User
  }

  type Mutation {
    registerUser(user: UserRegistration!): User!
    setToken(input: TokenRegistration): User
  }

  input UserRegistration {
    fullName: String!
    username: String!
    phoneNumber: String!
  }

  input TokenRegistration {
    expoToken: String!
    username: String!
  }
`;
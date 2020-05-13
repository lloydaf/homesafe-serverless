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
    registerUser(user: UserRegistration!): User
    setToken(input: TokenRegistration!): User
    login(input: UserLogin!): User
    sendNotification(input: [Notification]!): String
  }

  input UserRegistration {
    fullName: String!
    phoneNumber: String!
    username: String!
    password: String!
  }
  
  input UserLogin {
    username: String!
    password: String!
  }

  input TokenRegistration {
    expoToken: String!
    username: String!
  }
  
  input Notification {
    username: String!
    title: String!
    body: String!
  }
`;
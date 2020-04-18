import { ApolloServer } from 'apollo-server-lambda';
import { resolvers } from './src/graphql/resolvers/resolvers';
import { schema as typeDefs } from './src/graphql/schema/schema';
import * as AWS from 'aws-sdk';

const database = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
});

const context = () => ({
  database
});

const server = new ApolloServer({
  typeDefs, resolvers, context, playground: {
    endpoint: "/dev/api"
  }
});

exports.handler = server.createHandler();
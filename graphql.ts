import { ApolloServer } from 'apollo-server-lambda';
import { resolvers } from './src/graphql/resolvers';
import { schema as typeDefs } from './src/graphql/schema';
import * as AWS from 'aws-sdk';

const database = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
});

const server = new ApolloServer({
  typeDefs, resolvers, context: () => ({
    database
  }), playground: {
    endpoint: "/dev/api"
  }
});

exports.handler = server.createHandler();
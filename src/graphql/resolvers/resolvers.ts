import { usersQueries, userMutations } from './users/users.resolver';

export const resolvers = {
  Query: {
    ...usersQueries
  },
  Mutation : {
    ...userMutations
  }
}
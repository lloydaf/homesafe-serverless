import * as AWS from "aws-sdk";

export const resolvers = {
  Query: {
    getUsers(parent, args, context, info) {
      const database = context.database;
      return new Promise((resolve, reject) => {
        database.scan({
          TableName: 'users'
        }, (err, success) => {
          if (err) reject(err);
          resolve(success.Items);
        })
      })
    }
  }
}
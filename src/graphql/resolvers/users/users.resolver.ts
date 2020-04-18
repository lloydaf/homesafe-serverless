import * as AWS from "aws-sdk";

export const usersQueries = {
  user(_: any, args: any, context: { database: AWS.DynamoDB.DocumentClient; }, __: any) {
    const database: AWS.DynamoDB.DocumentClient = context.database;
    return new Promise((resolve, reject) => {
      database.get({ TableName: 'users', Key: args }, (err, data) => {
        if (err) reject(err);
        resolve(data.Item);
      })
    })
  }
}

export const userMutations = {
  registerUser(_: any, { user }: any, context: { database: AWS.DynamoDB.DocumentClient; }, __: any) {
    const database: AWS.DynamoDB.DocumentClient = context.database;
    return new Promise((resolve) => {
      database.put({
        TableName: 'users', Item: user
      }, (err, data) => {
        console.log(data, err);
        if (err) throw (err);
        resolve(user);
      })
    })
  },

  setToken(_: any, { input: { username, expoToken } }: any, context: { database: AWS.DynamoDB.DocumentClient; }, __: any) {
    const database: AWS.DynamoDB.DocumentClient = context.database;
    return new Promise((resolve) => {
      database.update({
        TableName: 'users', Key: {
          username
        },
        UpdateExpression: "set expoToken = :expoToken",
        ExpressionAttributeValues: {
          ":expoToken": expoToken
        },
        ReturnValues: "ALL_NEW"
      }, (err, data) => {
        console.log(data, err);
        if (err) throw (err);
        resolve(data.Attributes);
      })
    })
  }
}
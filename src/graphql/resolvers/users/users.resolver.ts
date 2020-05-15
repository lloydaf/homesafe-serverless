import * as AWS from "aws-sdk";
import * as bcrypt from 'bcrypt';
import { promisify } from "util";

export const usersQueries = {
  async user(_: any, args: any, context: { database: AWS.DynamoDB.DocumentClient; }, __: any) {
    const database: AWS.DynamoDB.DocumentClient = context.database;
    const data = await promisify(database.get.bind(database))({ TableName: 'users', Key: args });
    return data && data.Item || null;
  }
}

export const userMutations = {
  async registerUser(_: any, { user }: any, context: { database: AWS.DynamoDB.DocumentClient; }, __: any) {
    const safeUser = {
      ...user,
      password: await bcrypt.hash(user.password, 10)
    }
    const database: AWS.DynamoDB.DocumentClient = context.database;
    const input: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'users', Item: safeUser,
      ConditionExpression: 'attribute_not_exists(username)'
    }
    await promisify(database.put.bind(database))(input);
    return user;
  },

  async setToken(_: any, { input: { username, expoToken } }: any, context: { database: AWS.DynamoDB.DocumentClient; }, __: any) {
    const database: AWS.DynamoDB.DocumentClient = context.database;
    const data = await promisify(database.update.bind(database))({
      TableName: 'users', Key: {
        username
      },
      UpdateExpression: "set expoToken = :expoToken",
      ExpressionAttributeValues: {
        ":expoToken": expoToken
      },
      ReturnValues: "ALL_NEW"
    });
    return data.Attributes;
  },

  async login(_: any, { input: { username, password } }: any, context: { database: AWS.DynamoDB.DocumentClient; }, __: any) {
    const database: AWS.DynamoDB.DocumentClient = context.database;
    const data = await promisify(database.get.bind(database))({ TableName: 'users', Key: { username } })
    if (!data.Item) return null;
    const result = await bcrypt.compare(password, data.Item.password);
    return result ? (data && data.Item) : (null);
  },

  async sendNotification(_: any, { input: { recipientList, title, body } }: { input: { recipientList: string[], title: string, body: string } }, context: { database: AWS.DynamoDB.DocumentClient; }, __: any) {
    const database: AWS.DynamoDB.DocumentClient = context.database;
    const data = await promisify(database.batchGet.bind(database))({
      RequestItems: {
        'users': {
          Keys: recipientList.map(recepient => ({ username: recepient }))
        }
      }
    })

    const axios = require('axios');
    const message = data.Responses.users.map((item) => {
      return { data: { data: 'goes here' }, _displayInForeground: true, to: item.expoToken, sound: 'default', title, body }
    });

    await axios.post('https://exp.host/--/api/v2/push/send', message);
    return 'Success';
  }
}
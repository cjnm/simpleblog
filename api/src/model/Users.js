import { getDynamoDBClient } from '../utils/dynamodb.js';

const saveUserInfo = async (user) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            RequestItems: {
                [process.env.DYNAMODB_USER_TABLE]: [
                    {
                        PutRequest: {
                            Item: user
                        }
                    }
                ]
            }
        };
        await dynamoDBClient.batchWrite(params).promise();

    } catch (error) {
        console.log(error);
    }
}

export { saveUserInfo }

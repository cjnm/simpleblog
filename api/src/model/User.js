import { getDynamoDBClient } from '../utils/dynamodb.js';

const saveClientInfo = async () => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            RequestItems: {
                [process.env.DYNAMODB_USER_TABLE]: [
                    {
                        PutRequest: {
                            Item: {
                                id: 1,
                                username: 'test',
                                name: 'test',
                                email: 'seejan.raj@gmail.com',
                                avatar_url: 'https://avatars2.githubusercontent.com/u/52709818?s=460&v=4'
                            }
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

export { saveClientInfo }

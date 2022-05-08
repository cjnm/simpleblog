import { v4 as uuidv4 } from 'uuid';
import { getDynamoDBClient } from '../utils/dynamodb.js';

const saveBlog = async (id, username, title, content) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            RequestItems: {
                [process.env.DYNAMODB_BLOG_TABLE]: [
                    {
                        PutRequest: {
                            Item: {
                                id: uuidv4(),
                                user_id: id,
                                username: username,
                                title: title,
                                content: content
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

const getAllItems = async () => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE
        }
        const response = await dynamoDBClient.scan(params).promise();
        return response.Items;
    } catch (error) {
        console.log(error);
    }
}

export { saveBlog, getAllItems }

import { v4 as uuidv4 } from 'uuid';
import { getDynamoDBClient } from '../utils/dynamodb.js';
import redis, { invalidateCache } from '../utils/redis.js';

const saveBlog = async (id, username, title, content, avatar_url) => {
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
                                content: content,
                                avatar_url: avatar_url || '',
                            }
                        }
                    }
                ]
            }
        };

        await invalidateCache(id);
        await dynamoDBClient.batchWrite(params).promise();

    } catch (error) {
        console.log(error);
    }
}

const getAllItems = async () => {
    try {
        let cached_response = await redis.get('getAllItems', (err, getAllItems) => {
            if (getAllItems) {
                return JSON.parse(getAllItems);
            }
        }).catch(err => console.log(err));

        if (cached_response) {
            return JSON.parse(cached_response);
        }

        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE
        }
        const response = await dynamoDBClient.scan(params).promise();

        redis.set('getAllItems', JSON.stringify(response.Items));

        return response.Items;
    } catch (error) {
        console.log(error);
    }
}

const getAllItemsByUser = async (user_id) => {
    try {
        if (!user_id) {
            return [];
        }

        let cached_response = await redis.get(`getAllItemsByUser${user_id}`, (err, items) => {
            if (items) {
                return JSON.parse(items);
            }
        }).catch(err => console.log(err));
        if (cached_response) {
            return JSON.parse(cached_response);
        }

        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE,
            FilterExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': user_id
            }
        }

        const response = await dynamoDBClient.scan(params).promise();
        redis.set(`getAllItemsByUser${user_id}`, JSON.stringify(response.Items));

        return response.Items;
    } catch (error) {
        console.log(error);
    }
}

const deleteItemById = async (blog_id, user_id) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE,
            Key: {
                id: blog_id,
                user_id: user_id
            }
        }

        await invalidateCache(user_id);
        await dynamoDBClient.delete(params).promise();
    } catch (error) {
        console.log(error);
    }
}

const updateItem = async (title, content, blog_id, user_id) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE,
            Key: {
                id: blog_id,
                user_id: user_id
            },
            UpdateExpression: 'set title = :title, content = :content',
            ExpressionAttributeValues: {
                ':title': title,
                ':content': content
            }
        }

        await invalidateCache(user_id);
        await dynamoDBClient.update(params).promise();

    } catch (error) {
        console.log(error);
    }
}


export { saveBlog, getAllItems, getAllItemsByUser, deleteItemById, updateItem }

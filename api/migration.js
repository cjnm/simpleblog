import 'dotenv/config';
import AWS from 'aws-sdk';

const getDynamoDBClient = () => {
    return new AWS.DynamoDB({
        region: process.env.AWS_REGION,
        endpoint: process.env.AWS_ENDPOINT,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    });
}

const createUserTable = async () => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_USER_TABLE,
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH'
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'N'
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        };

        await dynamoDBClient.createTable(params).promise();
    } catch (error) {
        console.log(error);
    }
}

const createBlogTable = async () => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE,
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH'
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'N'
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        };

        await dynamoDBClient.createTable(params).promise();
    } catch (error) {
        console.log(error);
    }
}

createUserTable();
createBlogTable();
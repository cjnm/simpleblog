import AWS from 'aws-sdk';

const getDynamoDBClient = () => {
    return new AWS.DynamoDB.DocumentClient({
        region: process.env.AWS_REGION,
        endpoint: process.env.AWS_ENDPOINT,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    });
}



export { getDynamoDBClient };
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const DB_TABLE_NAME = 'prod_bookmarks_table';

exports.handler = async (event) => {
    try {
        console.log(JSON.stringify(event));
        // const requestBody = JSON.parse(event.body);
        //
        // const params = {
        //     TableName: DB_TABLE_NAME,
        //     Item: {
        //         id: requestBody.id,
        //         name: requestBody.name,
        //         description: requestBody.description
        //     }
        // };
        //
        // await dynamodb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item added to DynamoDB successfully' }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};

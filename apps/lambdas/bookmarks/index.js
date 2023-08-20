const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const DB_TABLE_NAME = 'prod_bookmarks_table';

//"resource": "/api/v1/bookmarks",
//     "path": "/api/v1/bookmarks",
//     "httpMethod": "GET",
//     "headers": {
exports.handler = async (event) => {
    try {
        console.log(JSON.stringify(event));
        const method = event.httpMethod;

        switch (method) {
            case 'GET': {
                return Controller.get(event);
            }
            case 'POST': {
                return Controller.post(event);
            }
            case 'PUT': {
                return Controller.put(event);
            }
            case 'DELETE': {
                return Controller.del(event);
            }
            default: {
                return {
                    statusCode: 404,
                    body: JSON.stringify({}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            }
        }
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


class Controller {
    async static get(event) {
        return makeRequestHandler(BasicUseCase, event)
    }
    async static post(event) {
        return makeRequestHandler(BasicUseCase, event)
    }
    async static put(event) {
        return makeRequestHandler(BasicUseCase, event)
    }
    async static del(event) {
        return makeRequestHandler(BasicUseCase, event)
    }
}

export async function runUseCase(UseCase, { params }) {
    // todo: implement validation execution
    return new UseCase().execute(params);
}

export async function makeRequestHandler(UseCase, params) {
    function logRequest(params, result, startTime) {
        console.log({
            useCase: UseCase.name,
            runtime: Date.now() - startTime,
            params,
            result,
        });
    }

    try {
        const startTime = Date.now();
        const result = await runUseCase(UseCase, { params });
        logRequest(params, result, startTime);

        return {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (err) {
        // todo: handle http errors
        console.error(`[ErrorHandler] ${err}`);
        return err;
    }
}

class BasicUseCase {
    async execute(params) {
        console.log("Hello from basic use case");
        return {
            data: []
        }
    }
}

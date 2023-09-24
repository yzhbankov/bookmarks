import { ReadBookmark, CreateBookmark, DeleteBookmark, UpdateBookmark } from '../usecases/index.js';

export default async function controller(method, event) {
    const body = event.body && JSON.parse(event.body);
    const headers = event.headers;
    // todo: replace header with cookie
    const owner = headers['Authorization'];
    const idStartIndex = event.path.lastIndexOf('/') + 1;
    const _id = event.path.substring(idStartIndex);

    if (!owner) {
        return {
            statusCode: 401,
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    switch (method) {
        case 'GET': {
            return Controller.get({ owner });
        }
        case 'POST': {
            return Controller.post(body);
        }
        case 'PUT': {
            return Controller.put({ ...body, _id, owner });
        }
        case 'DELETE': {
            return Controller.del({ _id, owner });
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
}

class Controller {
    static async get(params) {
        return makeRequestHandler(ReadBookmark, params)
    }
    static async post(params) {
        return makeRequestHandler(CreateBookmark, params)
    }
    static async put(params) {
        return makeRequestHandler(UpdateBookmark, params)
    }
    static async del(params) {
        return makeRequestHandler(DeleteBookmark, params)
    }
}

async function runUseCase(UseCase, { params }) {
    // todo: implement validation execution
    return new UseCase().execute(params);
}

async function makeRequestHandler(UseCase, params) {
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
        console.error(`[ErrorHandler] ${JSON.stringify(err)}`);
        return {
            statusCode: err.statusCode,
            body: JSON.stringify({ message: err.message }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}

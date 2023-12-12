import { HTTP_METHOD } from '../constants/index.js';
import { parseRequest } from '../utils/index.js';


export const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : process.env.BOOKMARKS_DOMAIN ? `https://${process.env.BOOKMARKS_DOMAIN}` : 'https://bookmarks.lat',
    'Access-Control-Allow-Methods' : 'GET, OPTIONS, POST, PUT, DELETE',
    'Access-Control-Allow-Headers' : 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
}

export function router(Controller) {
    return async function (method, event) {
        const data = parseRequest(event);

        switch (method) {
            case HTTP_METHOD.GET: {
                return Controller.get(data);
            }
            case HTTP_METHOD.POST: {
                return Controller.post(data);
            }
            case HTTP_METHOD.PUT: {
                return Controller.put(data);
            }
            case HTTP_METHOD.DELETE: {
                return Controller.del(data);
            }
            default: {
                return {
                    statusCode: 404,
                    body: JSON.stringify({}),
                    headers: {
                        ...defaultHeaders
                    }
                };
            }
        }
    }
}

async function runUseCase(UseCase, { params }) {
    // todo: implement validation execution
    return new UseCase().execute(params);
}

export async function requestHandler(UseCase, params, mapToResponse) {
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

        if (mapToResponse) {
            return mapToResponse(result);
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
                ...defaultHeaders

            }
        };
    } catch (err) {
        console.error(`[ErrorHandler] ${JSON.stringify(err)}`);
        return {
            statusCode: err.statusCode,
            body: JSON.stringify({ message: err.message }),
            headers: {
                ...defaultHeaders
            }
        }
    }
}

import { HTTP_METHOD } from '../constants/index.js';

export function controller(Routers) {
    return async function (method, event) {
        const body = event.body && JSON.parse(event.body);
        const headers = event.headers;
        const idStartIndex = event.path.lastIndexOf('/') + 1;
        const param = event.path.substring(idStartIndex);
        const data = { body, headers, param };

        switch (method) {
            case HTTP_METHOD.GET: {
                return Routers.get(data);
            }
            case HTTP_METHOD.POST: {
                return Routers.post(data);
            }
            case HTTP_METHOD.PUT: {
                return Routers.put(data);
            }
            case HTTP_METHOD.DELETE: {
                return Routers.del(data);
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
}

async function runUseCase(UseCase, { params }) {
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

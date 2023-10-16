import { UserLogin } from '../usecases/index.js';
import { UserValidate } from '../shared/usecases/index.js';
import { makeRequestHandler, defaultHeaders } from '../shared/system/index.js';

function mapToLoginResponse(result) {
    return {
        statusCode: 200,
        headers: {
            ...result.headers,
            ...defaultHeaders
        },
        body: JSON.stringify({
            ...result.body,
        }),
    }
}

export class Routers {
    static async login({ body }) {
        return makeRequestHandler(UserLogin, body, mapToLoginResponse)
    }
    static async validate({ cookie }) {
        return makeRequestHandler(UserValidate, cookie)
    }
}

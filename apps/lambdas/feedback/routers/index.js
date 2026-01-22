import { ReadFeedback, CreateFeedback } from '../usecases/index.js';
import { makeRequestHandler } from '../shared/system/index.js';

export class Routers {
    static async get({ body, cookie, param }) {
        return makeRequestHandler(ReadFeedback, { cookie })
    }
    static async post({ body, cookie, param }) {
        return makeRequestHandler(CreateFeedback, { data: body, cookie })
    }
    static async put({ body, cookie, param }) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Not found' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
    static async del({ body, cookie, param }) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Not found' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
}

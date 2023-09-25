import { ReadBookmark, CreateBookmark, DeleteBookmark, UpdateBookmark } from '../usecases/index.js';
import { makeRequestHandler } from '../shared/system/index.js';

export class Routers {
    static async get({ body, headers, param }) {
        const owner = headers['Authorization'];
        return makeRequestHandler(ReadBookmark, { owner })
    }
    static async post({ body, headers, param }) {
        return makeRequestHandler(CreateBookmark, body)
    }
    static async put({ body, headers, param }) {
        const owner = headers['Authorization'];
        return makeRequestHandler(UpdateBookmark, { ...body, _id: param, owner })
    }
    static async del({ body, headers, param }) {
        const owner = headers['Authorization'];
        return makeRequestHandler(DeleteBookmark, { _id: param, owner })
    }
}

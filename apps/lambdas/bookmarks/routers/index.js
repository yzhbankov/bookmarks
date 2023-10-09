import { ReadBookmark, CreateBookmark, DeleteBookmark, UpdateBookmark } from '../usecases/index.js';
import { makeRequestHandler } from '../shared/system/index.js';

export class Routers {
    static async get({ body, cookie, param }) {
        return makeRequestHandler(ReadBookmark, { cookie })
    }
    static async post({ body, cookie, param }) {
        return makeRequestHandler(CreateBookmark, { data: body, cookie })
    }
    static async put({ body, cookie, param }) {
        return makeRequestHandler(UpdateBookmark, { data: { ...body, _id: param }, cookie })
    }
    static async del({ body, cookie, param }) {
        return makeRequestHandler(DeleteBookmark, { _id: param, cookie })
    }
}

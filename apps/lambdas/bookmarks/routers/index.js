import { ReadBookmark, CreateBookmark, DeleteBookmark, UpdateBookmark } from '../usecases/index.js';
import { UserValidate } from '../shared/usecases/index.js';
import { makeRequestHandler } from '../shared/system/index.js';

export class Routers {
    static async get({ body, cookie, param }) {
        const data = await makeRequestHandler(UserValidate, cookie);
        console.log('data ', data);
        return makeRequestHandler(ReadBookmark, { owner: 'user' })
    }
    static async post({ body, cookie, param }) {
        return makeRequestHandler(CreateBookmark, body)
    }
    static async put({ body, cookie, param }) {
        const owner = 'Authorization';
        return makeRequestHandler(UpdateBookmark, { ...body, _id: param, owner })
    }
    static async del({ body, cookie, param }) {
        const owner = 'Authorization';
        return makeRequestHandler(DeleteBookmark, { _id: param, owner })
    }
}

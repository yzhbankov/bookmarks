import { ReadBookmark, CreateBookmark, DeleteBookmark, UpdateBookmark } from '../usecases/index.js';
import { requestHandler } from '../shared/system/index.js';

export class Controller {
    static async get({ body, cookie, param }) {
        return requestHandler(ReadBookmark, { cookie })
    }
    static async post({ body, cookie, param }) {
        return requestHandler(CreateBookmark, { data: body, cookie })
    }
    static async put({ body, cookie, param }) {
        return requestHandler(UpdateBookmark, { data: { ...body, _id: param }, cookie })
    }
    static async del({ body, cookie, param }) {
        return requestHandler(DeleteBookmark, { _id: param, cookie })
    }
}

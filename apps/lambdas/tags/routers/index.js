import { ReadTag, CreateTag, DeleteTag, UpdateTag } from '../usecases/index.js';
import { makeRequestHandler } from '../shared/system/index.js';

export class Routers {
    static async get({ body, cookie, param }) {
        return makeRequestHandler(ReadTag, { cookie });
    }
    static async post({ body, cookie, param }) {
        return makeRequestHandler(CreateTag, { data: body, cookie });
    }
    static async put({ body, cookie, param }) {
        return makeRequestHandler(UpdateTag, null);
    }
    static async del({ body, cookie, param }) {
        return makeRequestHandler(DeleteTag, { _id: param, cookie });
    }
}


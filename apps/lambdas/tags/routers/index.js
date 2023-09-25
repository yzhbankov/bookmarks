import { ReadTag, CreateTag, DeleteTag, UpdateTag } from '../usecases/index.js';
import { makeRequestHandler } from '../shared/system/index.js';

export class Routers {
    static async get({ body, headers, param }) {
        const owner = headers['Authorization'];
        return makeRequestHandler(ReadTag, { owner });
    }
    static async post({ body, headers, param }) {
        const owner = headers['Authorization'];
        return makeRequestHandler(CreateTag, { ...body, owner });
    }
    static async put({ body, headers, param }) {
        return makeRequestHandler(UpdateTag, null);
    }
    static async del({ body, headers, param }) {
        const owner = headers['Authorization'];
        return makeRequestHandler(DeleteTag, { _id: param, owner });
    }
}


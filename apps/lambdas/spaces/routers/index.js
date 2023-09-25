import { ReadSpace, CreateSpace, DeleteSpace, UpdateSpace } from '../usecases/index.js';
import { makeRequestHandler } from '../shared/system/index.js';

export class Routers {
    static async get({ body, headers, param }) {
        const owner = headers['Authorization'];
        return makeRequestHandler(ReadSpace, { owner });
    }
    static async post({ body, headers, param }) {
        const owner = headers['Authorization'];
        return makeRequestHandler(CreateSpace, { ...body, owner });
    }
    static async put({ body, headers, param }) {
        return makeRequestHandler(UpdateSpace, null);
    }
    static async del({ body, headers, param }) {
        const owner = headers['Authorization'];
        return makeRequestHandler(DeleteSpace, { _id: param, owner });
    }
}

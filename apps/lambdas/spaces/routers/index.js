import { ReadSpace, CreateSpace, DeleteSpace, UpdateSpace } from '../usecases/index.js';
import { makeRequestHandler } from '../shared/system/index.js';

export class Routers {
    static async get({ body, cookie, param }) {
        return makeRequestHandler(ReadSpace, { cookie });
    }
    static async post({ body, cookie, param }) {
        return makeRequestHandler(CreateSpace, { data: body, cookie });
    }
    static async put({ body, cookie, param }) {
        return makeRequestHandler(UpdateSpace, null);
    }
    static async del({ body, cookie, param }) {
        return makeRequestHandler(DeleteSpace, { _id: param, cookie });
    }
}

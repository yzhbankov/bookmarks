import { ReadSpace, CreateSpace, DeleteSpace, UpdateSpace } from '../usecases/index.js';
import { requestHandler } from '../shared/system/index.js';

export class Controller {
    static async get({ body, cookie, param }) {
        return requestHandler(ReadSpace, { cookie });
    }
    static async post({ body, cookie, param }) {
        return requestHandler(CreateSpace, { data: body, cookie });
    }
    static async put({ body, cookie, param }) {
        return requestHandler(UpdateSpace, null);
    }
    static async del({ body, cookie, param }) {
        return requestHandler(DeleteSpace, { _id: param, cookie });
    }
}

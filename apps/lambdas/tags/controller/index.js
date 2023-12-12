import { ReadTag, CreateTag, DeleteTag, UpdateTag } from '../usecases/index.js';
import { requestHandler } from '../shared/system/index.js';

export class Controller {
    static async get({ body, cookie, param }) {
        return requestHandler(ReadTag, { cookie });
    }
    static async post({ body, cookie, param }) {
        return requestHandler(CreateTag, { data: body, cookie });
    }
    static async put({ body, cookie, param }) {
        return requestHandler(UpdateTag, null);
    }
    static async del({ body, cookie, param }) {
        return requestHandler(DeleteTag, { _id: param, cookie });
    }
}


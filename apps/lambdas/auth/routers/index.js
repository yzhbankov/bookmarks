import { UserLogin, UserValidate } from '../usecases/index.js';
import { makeRequestHandler } from '../shared/system/index.js';

export class Routers {
    static async login({ body }) {
        return makeRequestHandler(UserLogin, body)
    }
    static async validate({ cookie }) {
        return makeRequestHandler(UserValidate, cookie)
    }
}

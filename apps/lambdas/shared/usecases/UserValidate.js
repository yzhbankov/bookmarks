import { JWT, UnauthorizedError } from '../models/index.js';

export class UserValidate {
    async execute(cookie) {
        try {
            return new JWT(cookie).verify(cookie);
        } catch (error) {
            console.error(error);
            throw new UnauthorizedError(error.message);
        }
    }
}

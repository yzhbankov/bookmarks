import { JWT } from '../models/index.js';
import { UnauthorizedError } from '../shared/models/index.js';

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

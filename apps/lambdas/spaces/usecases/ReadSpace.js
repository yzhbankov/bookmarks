import { SpacesRepo } from '../models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class ReadSpace {
    async execute({ cookie }) {
        const jwtContent = await new UserValidate().execute(cookie);
        return await new SpacesRepo().readByOwner(jwtContent.email);
    }
}

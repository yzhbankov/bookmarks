import { SpacesRepo } from '../models/index.js';
import { NotFoundError } from '../shared/models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class DeleteSpace {
    async execute({ _id, cookie }) {
        const jwtContent = await new UserValidate().execute(cookie);
        const spaces = await new SpacesRepo().readById(jwtContent.email, _id);
        if (!spaces.length) {
            throw new NotFoundError(`Space with id ${_id} not found`)
        }

        return new SpacesRepo().remove(jwtContent.email, spaces[0].name);
    }
}

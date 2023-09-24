import { SpacesRepo } from '../models/index.js';
import { NotFoundError } from '../shared/models/index.js';

export class DeleteSpace {
    async execute(params) {
        const spaces = await new SpacesRepo().readById(params.owner, params._id);
        if (!spaces.length) {
            throw new NotFoundError(`Space with id ${params._id} not found`)
        }

        return new SpacesRepo().remove(params.owner, spaces[0].name);
    }
}

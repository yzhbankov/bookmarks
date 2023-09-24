import { SpacesRepo, SpaceCreateDto } from '../models/index.js';
import { UnprocessableEntityError } from '../shared/index.js';

export class CreateSpace {
    async execute(params) {
        const tag = await new SpacesRepo().readByName(params.owner, params.name);
        if (tag) {
            throw new UnprocessableEntityError(`Space with name ${params.name} already exist`)
        }
        const data = new SpaceCreateDto(params);
        return new SpacesRepo().save(data);
    }
}

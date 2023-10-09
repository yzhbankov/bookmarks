import { SpacesRepo, SpaceCreateDto } from '../models/index.js';
import { UnprocessableEntityError } from '../shared/models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class CreateSpace {
    async execute({ data, cookie }) {
        const jwtContent = await new UserValidate().execute(cookie);
        const tag = await new SpacesRepo().readByName(jwtContent.email, data.name);
        if (tag) {
            throw new UnprocessableEntityError(`Space with name ${data.name} already exist`)
        }
        return new SpacesRepo().save(new SpaceCreateDto(data));
    }
}

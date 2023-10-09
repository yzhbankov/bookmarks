import { TagsRepo, TagCreateDto } from '../models/index.js';
import { UnprocessableEntityError } from '../shared/models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class CreateTag {
    async execute({ data, cookie }) {
        const jwtContent = await new UserValidate().execute(cookie);

        const tag = await new TagsRepo().readByName(jwtContent.email, data.name);
        if (tag) {
            throw new UnprocessableEntityError(`Tag with name ${data.name} already exist`)
        }
        return new TagsRepo().save(new TagCreateDto({ ...data, owner: jwtContent.email }));
    }
}

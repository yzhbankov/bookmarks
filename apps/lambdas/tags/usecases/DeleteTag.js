import { TagsRepo } from '../models/index.js';
import { NotFoundError } from '../shared/models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class DeleteTag {
    async execute({ _id, cookie }) {
        const jwtContent = await new UserValidate().execute(cookie);
        const tags = await new TagsRepo().readById(jwtContent.email, _id);
        if (!tags.length) {
            throw new NotFoundError(`Tag with id ${_id} not found`)
        }

        return new TagsRepo().remove(jwtContent.email, tags[0].name);
    }
}

import { TagsRepo } from '../models/index.js';
import { NotFoundError } from '../shared/models/index.js';

export class DeleteTag {
    async execute(params) {
        const tags = await new TagsRepo().readById(params.owner, params._id);
        if (!tags.length) {
            throw new NotFoundError(`Tag with id ${params._id} not found`)
        }

        return new TagsRepo().remove(params.owner, tags[0].name);
    }
}

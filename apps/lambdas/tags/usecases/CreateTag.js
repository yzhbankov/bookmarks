import { TagsRepo, TagCreateDto } from '../models/index.js';
import { UnprocessableEntityError } from '../shared/index.js';

export class CreateTag {
    async execute(params) {
        const tag = await new TagsRepo().readByName(params.owner, params.name);
        if (tag) {
            throw new UnprocessableEntityError(`Tag with name ${params.name} already exist`)
        }
        const data = new TagCreateDto(params);
        return new TagsRepo().save(data);
    }
}

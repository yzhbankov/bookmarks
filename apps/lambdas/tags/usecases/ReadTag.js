import { TagsRepo } from '../models/index.js';

export class ReadTag {
    async execute(params) {
        return await new TagsRepo().readByOwner(params.owner);
    }
}

import { TagsRepo } from '../models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class ReadTag {
    async execute({ cookie }) {
        const data = await new UserValidate().execute(cookie);
        return await new TagsRepo().readByOwner(data.email);
    }
}

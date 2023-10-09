import { BookmarksRepo } from '../models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class ReadBookmark {
    async execute(params) {
        const data = await new UserValidate().execute(params.cookie);
        return await new BookmarksRepo().readByOwner(data.email);
    }
}

import { BookmarksRepo } from '../models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class ReadBookmark {
    async execute({ cookie }) {
        const data = await new UserValidate().execute(cookie);
        return await new BookmarksRepo().readByOwner(data.email);
    }
}

import { BookmarksRepo } from '../models/index.js';
import { NotFoundError } from '../shared/models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class DeleteBookmark {
    async execute({ _id, cookie }) {
        const jwtContent = await new UserValidate().execute(cookie);
        const bookmarks = await new BookmarksRepo().readById(jwtContent.email, _id);
        if (!bookmarks.length) {
            throw new NotFoundError(`Bookmark with id ${_id} not found for user ${jwtContent.email}`);
        }

        return new BookmarksRepo().remove(jwtContent.email, bookmarks[0].url);
    }
}

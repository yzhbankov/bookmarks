import { BookmarksRepo, BookmarkUpdateDto } from '../models/index.js';
import { NotFoundError } from '../shared/models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class UpdateBookmark {
    async execute({ data, cookie }) {
        const jwtContent = await new UserValidate().execute(cookie);

        const bookmarks = await new BookmarksRepo().readById(jwtContent.email, data._id);
        if (!bookmarks.length) {
            throw new NotFoundError(`Bookmark with id ${data._id} not found`)
        }
        const updatedBookmark = new BookmarkUpdateDto({ ...data, owner: jwtContent.email });

        return new BookmarksRepo().update({ ...bookmarks[0], ...updatedBookmark });
    }
}

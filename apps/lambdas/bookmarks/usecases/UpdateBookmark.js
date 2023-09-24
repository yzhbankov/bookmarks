import { BookmarksRepo, BookmarkUpdateDto } from '../models/index.js';
import { NotFoundError } from '../shared/index.js';

export class UpdateBookmark {
    async execute(params) {
        const bookmarks = await new BookmarksRepo().readById(params.owner, params._id);
        if (!bookmarks.length) {
            throw new NotFoundError(`Bookmark with id ${params._id} not found`)
        }
        const data = new BookmarkUpdateDto(params);

        return new BookmarksRepo().update({ ...bookmarks[0], ...data });
    }
}

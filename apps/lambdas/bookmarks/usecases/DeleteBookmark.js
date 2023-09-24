import {BookmarksRepo, NotFoundError} from '../models/index.js';

export class DeleteBookmark {
    async execute(params) {
        const bookmarks = await new BookmarksRepo().readById(params.owner, params._id);
        if (!bookmarks.length) {
            throw new NotFoundError(`Bookmark with id ${params._id} not found`)
        }

        return new BookmarksRepo().remove(params.owner, bookmarks[0].url);
    }
}

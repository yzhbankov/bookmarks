import {BookmarksRepo, NotFoundError, BookmarkUpdateDto} from "../models/index.js";

export class UpdateBookmark {
    async execute(params) {
        const bookmarks = await new BookmarksRepo().readById(params.owner, params._id);
        if (!bookmarks.length) {
            throw new NotFoundError(`Bookmark with id ${params._id} not found`)
        }
        const data = new BookmarkUpdateDto(params);

        console.log('dataaaa ', data);
        console.log('bookmarks[0] ', bookmarks[0]);

        return new BookmarksRepo().update({ ...bookmarks[0], ...data });
    }
}

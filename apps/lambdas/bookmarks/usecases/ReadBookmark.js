import { BookmarksRepo } from '../models/index.js';

export class ReadBookmark {
    async execute(params) {
        const bookmarks = await new BookmarksRepo().readByOwner(params.owner);
        return { bookmarks }
    }
}

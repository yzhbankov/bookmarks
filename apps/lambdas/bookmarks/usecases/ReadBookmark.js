import { BookmarksRepo } from '../models/index.js';

export class ReadBookmark {
    async execute(params) {
        return await new BookmarksRepo().readByOwner(params.owner);
    }
}

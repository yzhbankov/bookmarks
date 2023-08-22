import { BookmarksRepo } from '../models/index.js';

export class CreateBookmark {
    async execute(params) {
        const bookmarks = new BookmarksRepo().save(params);
        console.log("Hello from CreateBookmark use case");
        console.log("params ", params);
        return { bookmarks }
    }
}

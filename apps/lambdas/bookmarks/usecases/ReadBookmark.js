import { BookmarksRepo } from '../models/index.js';

export class ReadBookmark {
    async execute(params) {
        console.log("Hello from ReadBookmark use case");
        console.log("params ", params);
        const bookmarks = await new BookmarksRepo().read(params);
        return { bookmarks }
    }
}

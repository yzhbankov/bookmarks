import { BookmarksRepo, BookmarkCreateDto } from '../models/index.js';
import { UnprocessableEntityError } from '../shared/models/index.js';

export class CreateBookmark {
    async execute(params) {
        const bookmark = await new BookmarksRepo().readByUrl(params.owner, params.url);
        if (bookmark) {
            throw new UnprocessableEntityError(`Bookmark with url ${params.url} already exist`)
        }
        const data = new BookmarkCreateDto(params);
        return new BookmarksRepo().save(data);
    }
}

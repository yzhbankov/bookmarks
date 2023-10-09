import { BookmarksRepo, BookmarkCreateDto } from '../models/index.js';
import { UnprocessableEntityError } from '../shared/models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class CreateBookmark {
    async execute({ data, cookie }) {
        const jwtContent = await new UserValidate().execute(cookie);

        if (jwtContent.email !== data.owner) {
            throw new UnprocessableEntityError('User email should be the same as owner')
        }

        const bookmark = await new BookmarksRepo().readByUrl(data.owner, data.url);
        if (bookmark) {
            throw new UnprocessableEntityError(`Bookmark with url ${data.url} already exist`)
        }
        return new BookmarksRepo().save(new BookmarkCreateDto(data));
    }
}

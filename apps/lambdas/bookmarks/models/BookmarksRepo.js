import { getPkSkForBookmark, getPkForOwner, getSkForUrl } from '../utils.js';
import { BookmarkDto } from './BookmarkDto.js';

export class BookmarksRepo {

    repository = null;

    static repositoryInstance = null;

    static setRepository(repository) {
        BookmarksRepo.repositoryInstance = repository;
    }

    constructor() {
        this.repository = BookmarksRepo.repositoryInstance;
    }

    async save(data) {
        const bookmark = new BookmarkDto(data);
        const { pkValue, skValue } = getPkSkForBookmark(bookmark);
        return this.repository.save({ pkValue, skValue, data: bookmark });
    }

    async update(data) {
        const bookmark = new BookmarkDto(data);
        const { pkValue, skValue } = getPkSkForBookmark(bookmark);
        return this.repository.save({ pkValue, skValue, data: bookmark });
    }

    async read(owner) {
        return this.repository.read(getPkForOwner(owner));
    }

    async remove(owner, url) {
        const pkValue = getPkForOwner(owner);
        const skValue = getSkForUrl(url);
        return this.repository.remove(pkValue, skValue);
    }
}

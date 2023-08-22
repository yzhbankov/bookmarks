import { getPkSkForBookmark, getPkForOwner, getSkForUrl } from '../utils.js';
import { Bookmark } from './model.js';

export class BookmarksRepo {
    #table = null;

    constructor(table) {
        this.#table = table;
    }

    async save(data) {
        const bookmark = new Bookmark(data);
        const { pkValue, skValue } = getPkSkForBookmark(bookmark);
        return this.#table.save({ pkValue, skValue, data: bookmark });
    }

    async read(owner) {
        return this.#table.read(getPkForOwner(owner));
    }

    async remove(owner, url) {
        const pkValue = getPkForOwner(owner);
        const skValue = getSkForUrl(url);
        return this.#table.remove(pkValue, skValue);
    }
}

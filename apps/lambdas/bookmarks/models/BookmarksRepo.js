import { getTableKey } from '../shared/utils/index.js';
import { BOOKMARKS } from '../constants.js';

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
        const pkValue = getTableKey(BOOKMARKS, data.owner);
        const skValue = data.url;
        return this.repository.save({ pkValue, skValue, data });
    }

    async update(data) {
        const pkValue = getTableKey(BOOKMARKS, data.owner);
        const skValue = data.url;
        await this.repository.update({ pkValue, skValue, data });
        return data;
    }

    async readByOwner(owner) {
        const pkValue = getTableKey(BOOKMARKS, owner);
        const records = await this.repository.readByPk(pkValue);
        return records.map(record => record['data']);
    }

    async readByUrl(owner, url) {
        const pkValue = getTableKey(BOOKMARKS, owner);
        const record = await this.repository.readByPkSk(pkValue, url);
        return record && record['Item'] && record['Item']['data'];
    }

    async readById(owner, id) {
        const pkValue = getTableKey(BOOKMARKS, owner);
        const records = await this.repository.readByPk(pkValue);
        return records.map(record => record['data']).filter(bookmark => bookmark._id === id);
    }

    async remove(owner, skValue) {
        const pkValue = getTableKey(BOOKMARKS, owner);
        return this.repository.remove(pkValue, skValue);
    }
}

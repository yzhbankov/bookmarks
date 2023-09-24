import { getPkSkForBookmark, getPkForOwner, getSkForUrl } from '../utils.js';


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
        const { pkValue, skValue } = getPkSkForBookmark(data);
        return this.repository.save({ pkValue, skValue, data });
    }

    async update(data) {
        const { pkValue, skValue } = getPkSkForBookmark(data);
        await this.repository.update({ pkValue, skValue, data });
        return data;
    }

    async readByOwner(owner) {
        const records = await this.repository.readByPk(getPkForOwner(owner));
        return records.map(record => record['data']);
    }

    async readByUrl(owner, url) {
        const record = await this.repository.readByPkSk(getPkForOwner(owner), getSkForUrl(url));
        return record && record['Item'] && record['Item']['data'];
    }

    async readById(owner, id) {
        const records = await this.repository.readByPk(getPkForOwner(owner));
        return records.map(record => record['data']).filter(bookmark => bookmark._id === id);
    }

    async remove(owner, url) {
        const pkValue = getPkForOwner(owner);
        const skValue = getSkForUrl(url);
        return this.repository.remove(pkValue, skValue);
    }
}

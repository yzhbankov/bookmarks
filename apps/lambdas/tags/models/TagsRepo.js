import { getTableKey } from '../shared/utils/index.js';
import { TAGS } from '../constants.js';

export class TagsRepo {

    repository = null;

    static repositoryInstance = null;

    static setRepository(repository) {
        TagsRepo.repositoryInstance = repository;
    }

    constructor() {
        this.repository = TagsRepo.repositoryInstance;
    }

    async save(data) {
        const pkValue = getTableKey(TAGS, data.owner);
        const skValue = data.name;
        return this.repository.save({ pkValue, skValue, data });
    }

    async update(data) {
        const pkValue = getTableKey(TAGS, data.owner);
        const skValue = data.name;
        await this.repository.update({ pkValue, skValue, data });
        return data;
    }

    async readByOwner(owner) {
        const pkValue = getTableKey(TAGS, owner);
        const records = await this.repository.readByPk(pkValue);
        return records.map(record => record['data']);
    }

    async readByName(owner, name) {
        const pkValue = getTableKey(TAGS, owner);
        const record = await this.repository.readByPkSk(pkValue, name);
        return record && record['Item'] && record['Item']['data'];
    }

    async readById(owner, id) {
        const pkValue = getTableKey(TAGS, owner);
        const records = await this.repository.readByPk(pkValue);
        return records.map(record => record['data']).filter(tag => tag._id === id);
    }

    async remove(owner, name) {
        const pkValue = getTableKey(TAGS, owner);
        return this.repository.remove(pkValue, name);
    }
}

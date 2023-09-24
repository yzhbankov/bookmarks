import { getTableKey } from '../shared/utils/index.js';
import { SPACES } from '../constants.js';

export class SpacesRepo {

    repository = null;

    static repositoryInstance = null;

    static setRepository(repository) {
        SpacesRepo.repositoryInstance = repository;
    }

    constructor() {
        this.repository = SpacesRepo.repositoryInstance;
    }

    async save(data) {
        const pkValue = getTableKey(SPACES, data.owner);
        const skValue = data.name;
        return this.repository.save({ pkValue, skValue, data });
    }

    async update(data) {
        const pkValue = getTableKey(SPACES, data.owner);
        const skValue = data.name;
        await this.repository.update({ pkValue, skValue, data });
        return data;
    }

    async readByOwner(owner) {
        const pkValue = getTableKey(SPACES, owner);
        const records = await this.repository.readByPk(pkValue);
        return records.map(record => record['data']);
    }

    async readByName(owner, name) {
        const pkValue = getTableKey(SPACES, owner);
        const record = await this.repository.readByPkSk(pkValue, name);
        return record && record['Item'] && record['Item']['data'];
    }

    async readById(owner, id) {
        const pkValue = getTableKey(SPACES, owner);
        const records = await this.repository.readByPk(pkValue);
        return records.map(record => record['data']).filter(tag => tag._id === id);
    }

    async remove(owner, skValue) {
        const pkValue = getTableKey(SPACES, owner);
        return this.repository.remove(pkValue, skValue);
    }
}

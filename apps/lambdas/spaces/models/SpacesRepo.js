import { getPkSkForSpace, getPkForOwner, getSkForName } from '../utils.js';

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
        const { pkValue, skValue } = getPkSkForSpace(data);
        return this.repository.save({ pkValue, skValue, data });
    }

    async update(data) {
        const { pkValue, skValue } = getPkSkForTag(data);
        await this.repository.update({ pkValue, skValue, data });
        return data;
    }

    async readByOwner(owner) {
        const records = await this.repository.readByPk(getPkForOwner(owner));
        return records.map(record => record['data']);
    }

    async readByName(owner, name) {
        const record = await this.repository.readByPkSk(getPkForOwner(owner), getSkForName(name));
        return record && record['Item'] && record['Item']['data'];
    }

    async readById(owner, id) {
        const records = await this.repository.readByPk(getPkForOwner(owner));
        return records.map(record => record['data']).filter(tag => tag._id === id);
    }

    async remove(owner, name) {
        const pkValue = getPkForOwner(owner);
        const skValue = getSkForName(name);
        return this.repository.remove(pkValue, skValue);
    }
}

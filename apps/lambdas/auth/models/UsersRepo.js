import { getTableKey } from '../shared/utils/index.js';
import { USERS } from '../constants.js';

export class UsersRepo {

    repository = null;

    static repositoryInstance = null;

    static setRepository(repository) {
        UsersRepo.repositoryInstance = repository;
    }

    constructor() {
        this.repository = UsersRepo.repositoryInstance;
    }

    async save(data) {
        const pkValue = getTableKey(USERS, data.email);
        const skValue = getTableKey(USERS, '');
        await this.repository.save({ pkValue, skValue, data });
        return data;
    }

    async read(email) {
        const pkValue = getTableKey(USERS, email);
        const skValue = getTableKey(USERS, '');
        const record = await this.repository.readByPkSk(pkValue, skValue);
        return record && record['Item'] && record['Item']['data'];
    }
}

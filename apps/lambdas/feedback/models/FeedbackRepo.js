import { getTableKey } from '../shared/utils/index.js';
import { FEEDBACK } from '../constants.js';

export class FeedbackRepo {

    repository = null;

    static repositoryInstance = null;

    static setRepository(repository) {
        FeedbackRepo.repositoryInstance = repository;
    }

    constructor() {
        this.repository = FeedbackRepo.repositoryInstance;
    }

    async save(data) {
        const pkValue = getTableKey(FEEDBACK, data.owner);
        const skValue = data._id;
        return this.repository.save({ pkValue, skValue, data });
    }

    async readByOwner(owner) {
        const pkValue = getTableKey(FEEDBACK, owner);
        const records = await this.repository.readByPk(pkValue);
        return records.map(record => record['data']);
    }
}

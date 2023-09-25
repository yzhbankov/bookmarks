import { NotFoundError } from '../shared/models/index.js';

export class UpdateTag {
    async execute(params) {
        throw new NotFoundError()
    }
}

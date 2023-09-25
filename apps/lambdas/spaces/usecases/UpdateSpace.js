import { NotFoundError } from '../shared/models/index.js';

export class UpdateSpace {
    async execute() {
        throw new NotFoundError();
    }
}

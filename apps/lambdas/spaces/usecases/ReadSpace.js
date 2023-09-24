import { SpacesRepo } from '../models/index.js';

export class ReadSpace {
    async execute(params) {
        return await new SpacesRepo().readByOwner(params.owner);
    }
}

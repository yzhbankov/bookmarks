import { FeedbackRepo } from '../models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class ReadFeedback {
    async execute({ cookie }) {
        const jwtContent = await new UserValidate().execute(cookie);

        return new FeedbackRepo().readByOwner(jwtContent.email);
    }
}

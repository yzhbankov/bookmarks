import { FeedbackRepo, FeedbackCreateDto } from '../models/index.js';
import { UserValidate } from '../shared/usecases/index.js';

export class CreateFeedback {
    async execute({ data, cookie }) {
        const jwtContent = await new UserValidate().execute(cookie);

        return new FeedbackRepo().save(new FeedbackCreateDto({ ...data, owner: jwtContent.email }));
    }
}

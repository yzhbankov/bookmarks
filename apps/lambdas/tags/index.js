import { TagsRepo } from './models/index.js';
import { DatabaseClient, JWT } from './shared/models/index.js';
import { router } from './shared/system/index.js';
import { Controller } from './controller/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

JWT.setSecret(JWT_SECRET);
TagsRepo.setRepository(new DatabaseClient('prod_bookmarks_table'));

export const handler = async (event) => {
    try {
        return router(Controller)(event['httpMethod'], event);
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};

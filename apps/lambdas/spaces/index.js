import { SpacesRepo } from './models/index.js';
import { DatabaseClient, JWT } from './shared/models/index.js';
import { controller } from './shared/system/index.js';
import { Routers } from './routers/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

JWT.setSecret(JWT_SECRET);
SpacesRepo.setRepository(new DatabaseClient('prod_bookmarks_table'));

export const handler = async (event) => {
    try {
        return controller(Routers)(event['httpMethod'], event);
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


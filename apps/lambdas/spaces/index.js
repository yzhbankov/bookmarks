import { SpacesRepo } from './models/index.js';
import Controller from './controller/index.js';
import { DatabaseClient } from '../shared/models/index.js';

SpacesRepo.setRepository(new DatabaseClient('prod_bookmarks_table'));

export const handler = async (event) => {
    try {
        return Controller(event['httpMethod'], event);
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

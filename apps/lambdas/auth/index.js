import { Routers } from './routers/index.js';
import { DatabaseClient, JWT } from './shared/models/index.js';
import { UsersRepo, OAuth } from './models/index.js';
import { getCookie } from './shared/utils/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
const GOOGLE_API_CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID || 'CLIENT_ID';
const GOOGLE_API_CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET || 'CLIENT_SECRET';

UsersRepo.setRepository(new DatabaseClient('prod_bookmarks_table'));
JWT.setSecret(JWT_SECRET);
OAuth.setClientCredentials({ clientId: GOOGLE_API_CLIENT_ID, clientSecret: GOOGLE_API_CLIENT_SECRET });

export const handler = async (event) => {
    const { path, httpMethod } = event;
    if (httpMethod === 'POST' && path.includes('/auth/login')) {
        return Routers.login({ body: JSON.parse(event.body) });
    } else if (httpMethod === 'GET' && path.includes('/auth/validate')) {
        // todo: make validate shared middleware
        return Routers.validate({ cookie: getCookie(event.headers) });
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not Found' })
    };
};

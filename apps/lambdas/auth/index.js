import { Routers } from './routers/index.js';
import { DatabaseClient } from './shared/models/index.js';
import { UsersRepo, JWT, OAuth } from './models/index.js';
import { getCookie } from './utils/index.js';

const JWT_SECRET = 'put some-SecretHere';
const CLIENT_ID = 'CLIENT_ID';
const CLIENT_SECRET = 'CLIENT_SECRET';

UsersRepo.setRepository(new DatabaseClient('prod_bookmarks_table'));
JWT.setSecret(JWT_SECRET);
OAuth.setClientCredentials({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET });

export const handler = async (event) => {
    const { path, httpMethod } = event;
    if (httpMethod === 'POST' && path.includes('/auth/login')) {
        return Routers.login({ body: JSON.parse(event.body) });
    } else if (httpMethod === 'GET' && path.includes('/auth/validate')) {
        return Routers.validate({ cookie: getCookie(event.headers) });
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not Found' })
    };
};

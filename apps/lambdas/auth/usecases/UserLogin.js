import { UsersRepo, UserCreateDto, OAuth } from '../models/index.js';
import { BadRequestError, JWT } from '../shared/models/index.js';

async function registerUser(user) {
    try {
        const data = new UserCreateDto(user);
        const newUser = await new UsersRepo().save(data);

        return new JWT(newUser).sign();
    } catch {
        throw new Error('User cannot be created');
    }
}

async function signIn(user) {
    if (!user) {
        throw new Error('Unauthenticated');
    }

    const existedUser = await new UsersRepo().read(user.email);

    if (!existedUser) {
        return registerUser(user);
    }

    return new JWT(existedUser).sign();
}

export class UserLogin {
    async execute(requestBody) {
        const authorizationCode = requestBody.code;

        const client = new OAuth();

        try {
            const { tokens: { id_token } } = await client.getToken(authorizationCode);
            const ticket = await client.verifyIdToken(id_token);
            const payload = ticket.getPayload();

            const token = await signIn(payload);

            // Set the user data in a cookie.
            const cookieValue = JSON.stringify(token);
            const cookieName = 'access_token';
            const cookieOptions = {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
                secure: true, // Set to true if your application is served over HTTPS
                Path: '/',
                domain: process.env.BOOKMARKS_DOMAIN || 'bookmarks.ink'
            };

            // Return the response with the cookie set.
            return {
                headers: {
                    'Set-Cookie': `${cookieName}=${encodeURIComponent(cookieValue)}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`,
                },
                body: { message: 'Authentication successfull' },
            };
        } catch (error) {
            console.error(error);
            throw new BadRequestError('Code exchange error');
        }
    }
}

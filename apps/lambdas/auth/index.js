import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

// Replace 'YOUR_CLIENT_ID' and 'YOUR_CLIENT_SECRET' with your actual Google OAuth2 client ID and client secret
const CLIENT_ID = 'CLIENT_ID';
const CLIENT_SECRET = 'CLIENT_SECRET';
const JWT_SECRET = 'put some-SecretHere';

function generateJwt(payload) {
    return jwt.sign(payload, JWT_SECRET);
}

async function registerUser(user) {
    try {
        //   const newUser = await this.usersService.create(user);

        // tmp
        const newUser = {
            _id: '1111',
            email: user.email,
            name: user.name,
            locale: user.locale,
            picture: user.picture,
        };

        return generateJwt({
            sub: newUser._id,
            email: newUser.email,
            name: newUser.name,
            locale: user.locale,
            picture: user.picture,
        });
    } catch {
          throw new Error('User cannot be created');
    }
}

async function findUser(email) {
    // read dynamodb find user
    return null;
}

async function signIn(user) {
    if (!user) {
        throw new Error('Unauthenticated');
    }

    const userExists = await findUser(user.email);

    if (!userExists) {
        return registerUser(user);
    }

    return generateJwt({
        sub: userExists._id,
        email: userExists.email,
        name: userExists.name,
        locale: user.locale,
        picture: user.picture,
    });
}

export const handler = async (event) => {
    const requestBody = JSON.parse(event.body);
    const authorizationCode = requestBody.code;

    const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, 'postmessage');

    try {
        const { tokens: { id_token } } = await client.getToken(authorizationCode);

        const ticket = await client.verifyIdToken({ idToken: id_token, audience: CLIENT_ID });
        const payload = ticket.getPayload();
        const token = await signIn(payload);

        // Set the user data in a cookie.
        const cookieValue = JSON.stringify(token);
        const cookieName = 'access_token';
        const cookieOptions = {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
            secure: true, // Set to true if your application is served over HTTPS
            domain: 'bookmarks.lat'
        };

        // Return the response with the cookie set.
        return {
            statusCode: 200,
            headers: {
                'Set-Cookie': `${cookieName}=${encodeURIComponent(cookieValue)}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`,
            },
            body: JSON.stringify({ message: 'Authentication successful' }),
        };
    } catch (error) {
        // Handle token exchange failure
        console.error(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Code exchange error' }),
        };
    }
};

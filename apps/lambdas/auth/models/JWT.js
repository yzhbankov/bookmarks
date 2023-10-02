import jwt from 'jsonwebtoken';

export class JWT {
    /**
     * @class JWT
    * */

    static secret = null;

    static setSecret(secret) {
        JWT.secret = secret;
    }

    /**
     * @method
     * @param {UserCreateDto} payload
    * */
    constructor(payload) {
        this.secret = JWT.secret;
        this.payload = {
            _id: payload._id,
            email: payload.email,
            name: payload.name,
            locale: payload.locale,
            picture: payload.picture,
            familyName: payload.familyName,
            givenName: payload.givenName,
        };
    }

    /**
     * @method
     * @return {String}
    * */
    sign() {
        return jwt.sign(this.payload, this.secret);
    }
}

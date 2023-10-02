import AWS from '/var/runtime/node_modules/aws-sdk/lib/aws.js';

export class UserCreateDto {
    /**
     * class UserCreateDto
     * */

    /**
     * @property {String|null}
     * */
    iss = null;
    /**
     * @property {String|null}
     * */
    azp = null;
    /**
     * @property {String|null}
     * */
    aud = null;
    /**
     * @property {String|null}
     * */
    sub = null;
    /**
     * @property {Boolean|null}
     * */
    emailVerified = null;
    /**
     * @property {String|null}
     * */
    atHash = null;
    /**
     * @property {Number|null}
     * */
    iat = null;
    /**
     * @property {Number|null}
     * */
    exp = null;
    /**
     * @property {String|null}
     * */
    email = null;
    /**
     * @property {String|null}
     * */
    name = null;
    /**
     * @property {String|null}
     * */
    picture = null;
    /**
     * @property {String|null}
     * */
    givenName = null;
    /**
     * @property {String|null}
     * */
    familyName = null;
    /**
     * @property {String|null}
     * */
    locale = null;
    /**
     * @property {String|null}
     * */
    _id = null;
    /**
     * @property {String|null}
     * */
    createdAt = null;
    /**
     * @property {String|null}
     * */
    updatedAt = null;

    constructor(data) {
        this.iss = data.iss;
        this.azp = data.azp;
        this.aud = data.aud;
        this.sub = data.sub;
        this.emailVerified = data.email_verified;
        this.atHash = data.at_hash;
        this.iat = data.iat;
        this.exp = data.exp;

        this.email = data.email;
        this.name = data.name;
        this.picture = data.picture;
        this.givenName = data.given_name;
        this.familyName = data.family_name;
        this.locale = data.locale;

        this._id = data._id || AWS.util.uuid.v4();
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }
}

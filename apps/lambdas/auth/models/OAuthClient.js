import { OAuth2Client } from 'google-auth-library';

export class OAuth {
    /**
     * @class OAuth
    * */

    static clientId = null;

    static clientSecret = null;

    static setClientCredentials({ clientId, clientSecret }) {
        OAuth.clientId = clientId;
        OAuth.clientSecret = clientSecret;
    }

    client = null;

    clientId = null;

    constructor() {
        this.client = new OAuth2Client(OAuth.clientId, OAuth.clientSecret, 'postmessage');
        this.clientId = OAuth.clientId;
    }

    async getToken(authorizationCode) {
        return this.client.getToken(authorizationCode);
    }

    async verifyIdToken(idToken) {
        return this.client.verifyIdToken({ idToken: idToken, audience: this.clientId });
    }
}

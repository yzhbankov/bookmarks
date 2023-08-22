import AWS from '/var/runtime/node_modules/aws-sdk/lib/aws.js';

export class Bookmark {
    /**
     * class Bookmark
     * */

    /**
     * @property {String|null}
     * */
    _id = null;
    /**
     * @property {String|null}
     * */
    url = null;
    /**
     * @property {String|null}
     * */
    description = null;
    /**
     * @property {String|null}
     * */
    title = null;
    /**
     * @property {String|null}
     * */
    tag = null;
    /**
     * @property {String|null}
     * */
    space = null;
    /**
     * @property {String|null}
     * */
    owner = null;
    /**
     * @property {String|null}
     * */
    createdAt = null;
    /**
     * @property {String|null}
     * */
    updatedAt = null;

    constructor(data) {
        this._id = data._id || AWS.util.uuid.v4();
        this.url = data.url || null;
        this.description = data.description || null;
        this.title = data.title || null;
        this.tag = data.tag || null;
        this.space = data.space || null;
        this.owner = data.owner || null;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }
}

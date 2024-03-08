import AWS from 'aws-sdk';

export class SpaceCreateDto {
    /**
     * class TagCreateDto
     * */

    /**
     * @property {String|null}
     * */
    _id = null;
    /**
     * @property {String|null}
     * */
    name = null;
    /**
     * @property {String|null}
     * */
    description = null;
    /**
     * @property {String|null}
     * */
    owner = null;
    /**
     * @property {String|null}
     * */
    createdAt = null;

    constructor(data) {
        this._id = data._id || AWS.util.uuid.v4();
        this.name = data.name || null;
        this.description = data.description || null;
        this.owner = data.owner || null;
        this.createdAt = new Date().toISOString();
    }
}

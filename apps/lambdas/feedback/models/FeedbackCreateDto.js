import AWS from 'aws-sdk';

export class FeedbackCreateDto {
    /**
     * @property {String|null}
     * */
    _id = null;
    /**
     * @property {String|null}
     * */
    rating = null;
    /**
     * @property {String|null}
     * */
    comment = null;
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
        this.rating = data.rating || null;
        this.comment = data.comment || null;
        this.owner = data.owner || null;
        this.createdAt = data.createdAt || new Date().toISOString();
    }
}

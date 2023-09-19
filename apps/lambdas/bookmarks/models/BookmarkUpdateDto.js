export class BookmarkUpdateDto {
    /**
     * class BookmarkUpdateDto
     * */

    constructor(data) {
        if (data._id) this._id = data._id;
        if (data.url) this.url = data.url;
        if (data.description) this.description = data.description || null;
        if (data.title) this.title = data.title || null;
        if (data.tag) this.tag = data.tag || null;
        if (data.space) this.space = data.space || null;
        this.updatedAt = new Date().toISOString();
    }
}

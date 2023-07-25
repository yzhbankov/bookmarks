export interface IBookmarkRaw {
    _id: string;
    url: string;
    description: string;
    title: string;
    tag: string;
    space: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBookmark {
    id: string;
    url: string;
    description: string;
    title: string;
    tag: string;
    space: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBookmarkCreate {
    url: string;
    description: string;
    title: string;
    tag?: string;
    space?: string;
}

export interface IBookmarkUpdate extends IBookmarkCreate {
    id: string;
}

export interface IBookmarkTable extends IBookmark {
    tagName: string | undefined;
}

export class Bookmark implements IBookmark {
    id: string;

    url: string;

    description: string;

    title: string;

    tag: string;

    space: string;

    createdAt: string;

    updatedAt: string;

    constructor(props: IBookmarkRaw) {
        this.id = props._id;
        this.url = props.url;
        this.description = props.description;
        this.title = props.title;
        this.tag = props.tag;
        this.space = props.space;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}

export interface ITagRaw {
    _id: string;
    name: string;
    description: string;
    owner: string;
    createdAt: string;
}

export interface ITag {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

export interface ITagPostBody {
    name: string;
    description: string;
}

export class Tag implements ITag {
    id: string;

    description: string;

    name: string;

    createdAt: string;

    constructor(props: ITagRaw) {
        this.id = props._id;
        this.name = props.name;
        this.description = props.description;
        this.createdAt = props.createdAt;
    }
}

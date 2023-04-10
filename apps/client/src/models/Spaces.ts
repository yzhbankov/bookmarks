export interface ISpaceRaw {
    _id: string;
    name: string;
    description: string;
    owner: string;
    createdAt: string;
}

export interface ISpace {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

export class Space implements ISpace {
    id: string;

    description: string;

    name: string;

    createdAt: string;

    constructor(props: ISpaceRaw) {
        this.id = props._id;
        this.name = props.name;
        this.description = props.description;
        this.createdAt = props.createdAt;
    }
}

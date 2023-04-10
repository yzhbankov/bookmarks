import { Axios } from 'axios';
import { Tag, ITagRaw, ITag, ITagCreate } from '../../models';

export interface IAxiosTagsApi {
    readList: () => Promise<null | ITag[]>;
    create: (bookmark: ITagCreate) => Promise<ITag>;
    edit: (id: string, tag: ITag) => Promise<ITag | null>;
    delete: (id: string) => Promise<any>;
}

export class AxiosTagsApi implements IAxiosTagsApi {
    private http: Axios;

    constructor(http: Axios) {
        this.http = http;
    }

    async readList(): Promise<ITag[] | null> {
        const response = await this.http.get('/api/v1/tags');
        if (response) {
            response.data = response.data.map((item: ITagRaw) => new Tag(item));
            return response.data;
        }
        return null;
    }

    async create(data: ITagCreate): Promise<ITag> {
        const response = await this.http.post('/api/v1/tags', data);
        return new Tag(response.data);
    }

    async edit(id: string, tag: ITag): Promise<ITag | null> {
        const response = await this.http.put(`/api/v1/tags/${id}`, tag);
        if (response) {
            return new Tag(response.data);
        }
        return null;
    }

    async delete(id: string): Promise<any> {
        const response = await this.http.delete(`/api/v1/tags/${id}`);
        if (response) {
            return new Tag(response.data);
        }
        return null;
    }
}

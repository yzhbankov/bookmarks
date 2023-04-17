import { Axios } from 'axios';
import { IBookmark, IBookmarkRaw, IBookmarkCreate, Bookmark } from '../../models';

export interface IAxiosBookmarksApi {
    readList: () => Promise<null | IBookmark[]>;
    create: (bookmark: IBookmarkCreate) => Promise<IBookmark>;
    edit: (id: string, bookmark: IBookmark) => Promise<IBookmark | null>;
    delete: (id: string) => Promise<any>;
}

export class AxiosBookmarksApi implements IAxiosBookmarksApi {
    private http: Axios;

    constructor(http: Axios) {
        this.http = http;
    }

    async readList(): Promise<IBookmark[] | null> {
        const response = await this.http.get('/api/v1/bookmarks');
        if (response) {
            response.data = response.data.map((item: IBookmarkRaw) => new Bookmark(item));
            return response.data;
        }
        return null;
    }

    async create(data: IBookmarkCreate): Promise<IBookmark> {
        if (data.tag === '') {
            delete data.tag;
        }
        const response = await this.http.post('/api/v1/bookmarks', data);
        return new Bookmark(response.data);
    }

    async edit(id: string, bookmark: IBookmark): Promise<IBookmark | null> {
        const response = await this.http.put(`/api/v1/bookmarks/${id}`, bookmark);
        if (response) {
            return new Bookmark(response.data);
        }
        return null;
    }

    async delete(id: string): Promise<any> {
        const response = await this.http.delete(`/api/v1/bookmarks/${id}`);
        if (response) {
            return new Bookmark(response.data);
        }
        return null;
    }
}

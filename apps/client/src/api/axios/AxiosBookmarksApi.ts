import { Axios } from 'axios';
import { IBookmark, IBookmarkRaw, IBookmarkCreate, IBookmarkUpdate, Bookmark } from '../../models';

export interface IAxiosBookmarksApi {
    readList: () => Promise<null | IBookmark[]>;
    create: (bookmark: IBookmarkCreate) => Promise<IBookmark | null>;
    edit: (bookmark: IBookmarkUpdate) => Promise<IBookmark | null>;
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

    async edit(bookmark: IBookmarkUpdate): Promise<IBookmark | null> {
        const response = await this.http.put(`/api/v1/bookmarks/${bookmark.id}`, bookmark);
        if (response) {
            return new Bookmark(response.data);
        }
        return null;
    }

    async delete(id: string): Promise<IBookmark | null> {
        const response = await this.http.delete(`/api/v1/bookmarks/${id}`);
        if (response) {
            return new Bookmark(response.data);
        }
        return null;
    }
}

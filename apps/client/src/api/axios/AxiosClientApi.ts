import axios from 'axios';
import { AxiosBookmarksApi, IAxiosBookmarksApi } from './AxiosBookmarksApi';
import { AxiosTagsApi, IAxiosTagsApi } from './AxiosTagsApi';
import { AxiosSpacesApi, IAxiosSpacesApi } from './AxiosSpacesApi';

type ClientOptions = { baseURL: string; securityToken: string };

export interface IAxiosClientApi {
    readonly bookmarks: IAxiosBookmarksApi;
    readonly tags: IAxiosTagsApi;
    readonly spaces: IAxiosSpacesApi;
}

export class AxiosClientApi implements IAxiosClientApi {
    readonly _bookmarks: IAxiosBookmarksApi;

    readonly _tags: IAxiosTagsApi;

    readonly _spaces: IAxiosSpacesApi;

    constructor(options: ClientOptions) {
        const instance = axios.create({
            baseURL: options.baseURL,
            timeout: 1000,
            headers: {
                // todo: pass cookie
                // 'X-User-Security-Token': options.securityToken,
            },
        });
        this._bookmarks = new AxiosBookmarksApi(instance);
        this._tags = new AxiosTagsApi(instance);
        this._spaces = new AxiosSpacesApi(instance);
    }

    get bookmarks(): IAxiosBookmarksApi {
        return this._bookmarks;
    }

    get tags(): IAxiosTagsApi {
        return this._tags;
    }

    get spaces(): IAxiosSpacesApi {
        return this._spaces;
    }
}

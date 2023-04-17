import axios from 'axios';
import { AxiosBookmarksApi, IAxiosBookmarksApi } from './AxiosBookmarksApi';
import { AxiosTagsApi, IAxiosTagsApi } from './AxiosTagsApi';
import { AxiosSpacesApi, IAxiosSpacesApi } from './AxiosSpacesApi';
import { AxiosAuthApi, IAxiosAuthApi } from './AxiosAuthApi';

type ClientOptions = { baseURL: string };

export interface IAxiosClientApi {
    readonly bookmarks: IAxiosBookmarksApi;
    readonly tags: IAxiosTagsApi;
    readonly spaces: IAxiosSpacesApi;
    readonly auth: IAxiosAuthApi;
}

export class AxiosClientApi implements IAxiosClientApi {
    readonly _bookmarks: IAxiosBookmarksApi;

    readonly _tags: IAxiosTagsApi;

    readonly _spaces: IAxiosSpacesApi;

    readonly _auth: IAxiosAuthApi;

    constructor(options: ClientOptions) {
        const instance = axios.create({
            withCredentials: true, // send/receive cookie
            baseURL: options.baseURL,
            timeout: 1000,
        });
        this._bookmarks = new AxiosBookmarksApi(instance);
        this._tags = new AxiosTagsApi(instance);
        this._spaces = new AxiosSpacesApi(instance);
        this._auth = new AxiosAuthApi(instance);
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

    get auth(): IAxiosAuthApi {
        return this._auth;
    }
}

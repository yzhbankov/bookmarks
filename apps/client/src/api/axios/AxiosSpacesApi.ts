import { Axios } from 'axios';
import { Space, ISpaceRaw, ISpace } from '../../models';

export interface IAxiosSpacesApi {
    readList: () => Promise<null | ISpace[]>;
}

export class AxiosSpacesApi implements IAxiosSpacesApi {
    private http: Axios;

    constructor(http: Axios) {
        this.http = http;
    }

    async readList(): Promise<ISpace[] | null> {
        const response = await this.http.get('/api/v1/spaces');
        if (response) {
            response.data = response.data.map((item: ISpaceRaw) => new Space(item));
            return response.data;
        }
        return null;
    }
}

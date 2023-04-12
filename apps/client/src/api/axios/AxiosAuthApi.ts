import { Axios, AxiosResponse } from 'axios';
import { IAuth } from '../../models';

export interface IAxiosAuthApi {
    login: (data: IAuth) => Promise<any>;
    validate: () => Promise<any>;
}

export class AxiosAuthApi implements IAxiosAuthApi {
    private http: Axios;

    constructor(http: Axios) {
        this.http = http;
    }

    async login(data: IAuth): Promise<AxiosResponse> {
        return this.http.post('/api/v1/auth/login', data);
    }

    async validate(): Promise<AxiosResponse> {
        return this.http.get('/api/v1/auth/validate');
    }
}

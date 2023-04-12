import { config } from '../config';
import { AxiosClientApi, IAxiosClientApi } from './axios';

type ConfigOptions = {
    type: string;
    options: {
        baseURL: string;
    };
};

export type ApiClient = IAxiosClientApi;

export const ClientTypes = {
    Mock: 'mock',
    Axios: 'axios',
};

function createClient(params: ConfigOptions = { type: ClientTypes.Mock, options: { baseURL: '' } }): ApiClient {
    return new AxiosClientApi(params.options);
}

export const client: ApiClient = createClient({
    type: ClientTypes.Axios,
    options: {
        baseURL: config.baseURL,
    },
});

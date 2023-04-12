import { config } from '../config';
import { AxiosClientApi, IAxiosClientApi } from './axios';
import { appPersistentStorage } from '../utils';

type ConfigOptions = {
    type: string;
    options: {
        baseURL: string;
        securityToken: string;
    };
};

export type ApiClient = IAxiosClientApi;

export const ClientTypes = {
    Mock: 'mock',
    Axios: 'axios',
};

/**
 * @param {Object} config - client configs
 * @param {String} config.type ['axios'] - control implementation 'mock' or 'axios'
 * @param {Object} config.options - API client options
 * @param {String} config.options.baseURL - application base url for an API client
 * @return {IAxiosClientApi}
 */
function createClient(
    config: ConfigOptions = { type: ClientTypes.Mock, options: { baseURL: '', securityToken: '' } }
): ApiClient {
    const { type, options } = config;
    // if (type === ClientTypes.Mock) {
    //     return new MockClientApi();
    // }
    return new AxiosClientApi(options);
}

export const client: ApiClient = createClient({
    type: ClientTypes.Axios,
    options: {
        baseURL: config.baseURL,
        securityToken: appPersistentStorage.securityToken || '',
    },
});

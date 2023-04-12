import { createContext, Context } from 'react';
import { ApiClient } from '../api';
import { IAppPersistentStorage } from '../utils';

export type AppContextType = {
    api: ApiClient | null;
    appPersistentStorage: IAppPersistentStorage;
};

// @ts-ignore
export const AppContext: Context<AppContextType> = createContext({
    api: null,
    appPersistentStorage: null,
});

import { createContext, Context } from 'react';
import { ApiClient } from '../api';

export type AppContextType = {
    api: ApiClient | null;
};

// @ts-ignore
export const AppContext: Context<AppContextType> = createContext({
    api: null,
});

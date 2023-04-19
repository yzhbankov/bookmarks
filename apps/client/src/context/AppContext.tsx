import React, { createContext, Context, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ApiClient, client } from '../api';

export type AppContextType = {
    api: ApiClient | null;
};

type AppProviderPropsType = {
    children: ReactNode;
};

export const AppContext: Context<AppContextType> = createContext<any>({ api: null });

export function AppProvider({ children }: AppProviderPropsType) {
    return <AppContext.Provider value={{ api: client }}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
    children: PropTypes.shape({}),
};

AppProvider.defaultProps = {
    children: null,
};

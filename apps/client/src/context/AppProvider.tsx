import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { client } from '../api';
import { appPersistentStorage } from '../utils';
import { AppContext } from './AppContext';

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    return <AppContext.Provider value={{ api: client, appPersistentStorage }}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
    children: PropTypes.shape({}),
};

AppProvider.defaultProps = {
    children: null,
};

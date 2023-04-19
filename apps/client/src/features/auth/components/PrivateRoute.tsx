import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { appPersistentStorage } from '../../../utils';

export function PrivateRoute() {
    return appPersistentStorage.token ? <Outlet /> : <Navigate to="/auth" />;
}

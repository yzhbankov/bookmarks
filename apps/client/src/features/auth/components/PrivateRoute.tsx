import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export function PrivateRoute() {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to="/auth" />;
}

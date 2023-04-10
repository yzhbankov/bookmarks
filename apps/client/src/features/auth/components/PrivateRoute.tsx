import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export function PrivateRoute() {
    const auth: any = { token: null };
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

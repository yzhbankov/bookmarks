import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { LoginPage, PrivateRoute } from '../features/auth/components';

export function AppContainer() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<App />} />
                </Route>
            </Routes>
        </>
    );
}

AppContainer.defaultProps = {};

AppContainer.propTypes = {};

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { config } from './config';
import { AppContainer } from './app/AppContainer';
import { AppRouter, ErrorBoundaryComponent } from './components';
import { AppProvider } from './context';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={config.clientId}>
            <AppProvider>
                <ErrorBoundaryComponent>
                    <BrowserRouter>
                        <AppRouter>
                            <AppContainer />
                        </AppRouter>
                    </BrowserRouter>
                </ErrorBoundaryComponent>
            </AppProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

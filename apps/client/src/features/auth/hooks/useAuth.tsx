import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { AppContext, AppContextType } from '../../../context';

interface IUseAuth {
    token: string | undefined;
    login: () => void;
    checkSession: () => Promise<void>;
    user: any;
    error: any;
}

const AUTH_PATH = '/auth';
const ROOT_PATH = '/';

export function useAuth(): IUseAuth {
    const [error, setError] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const { api, appPersistentStorage } = useContext<AppContextType>(AppContext);
    const lastPath = appPersistentStorage?.lastRoutePath || ROOT_PATH;

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const tokens = await api?.auth.login(codeResponse);
            setUser(tokens);
            navigate(lastPath);
        },
        onError: async (errorResponse) => {
            setError(errorResponse);
        },
        flow: 'auth-code',
    });

    const checkSession = async () => {
        api?.auth
            .validate()
            .then(() => {
                navigate(lastPath);
            })
            .catch(() => {
                navigate(AUTH_PATH);
            });
    };

    return {
        token: appPersistentStorage.token,
        checkSession,
        login,
        user,
        error,
    };
}

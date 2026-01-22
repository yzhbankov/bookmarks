import { useContext, useState, useCallback, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useGoogleLogin } from '@react-oauth/google';
import { AppContext, AppContextType } from '../../../context';
import { appPersistentStorage } from '../../../utils';

interface IUseAuth {
    login: () => void;
    logout: () => void;
    checkSession: () => Promise<void>;
    user: any;
    error: any;
}

const AUTH_PATH = '/auth';
const ROOT_PATH = '/';

export function useAuth(): IUseAuth {
    const [error, setError] = useState<any>(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { api } = useContext<AppContextType>(AppContext);
    const lastPath = appPersistentStorage?.lastRoutePath || ROOT_PATH;
    const user = useMemo(() => {
        return appPersistentStorage.token && jwtDecode(appPersistentStorage.token);
    }, [appPersistentStorage.token]);

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                await api?.auth.login(codeResponse);
                // Navigate after login - cookie should be set by the response
                navigate(lastPath);
            } catch (err) {
                console.error('Login error:', err);
                setError(err);
            }
        },
        onError: async (errorResponse) => {
            console.error('errorResponse ', errorResponse);
            setError(errorResponse);
        },
        flow: 'auth-code',
    });

    const logout = useCallback(() => {
        queryClient.clear();
        appPersistentStorage.clearCookie();
        navigate(AUTH_PATH);
    }, []);

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
        checkSession,
        login,
        logout,
        user,
        error,
    };
}

import { useEffect, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks';
import { appPersistentStorage } from '../utils';

interface AppRouterProps {
    children: ReactNode;
}
export function AppRouter({ children }: AppRouterProps) {
    const location = useLocation();
    const { checkSession } = useAuth();
    useEffect(() => {
        if (!location.pathname.includes('/auth')) {
            appPersistentStorage.lastRoutePath = location.pathname;
        }
    }, [location.pathname]);

    useEffect(() => {
        checkSession();
    }, []);

    return <>{children}</>;
}

AppRouter.propTypes = {
    children: PropTypes.shape({}),
};

AppRouter.defaultProps = {
    children: null,
};

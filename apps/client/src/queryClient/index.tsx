import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minutes,
            cacheTime: 10 * 60 * 1000, // 10 minutes
        },
    },
});

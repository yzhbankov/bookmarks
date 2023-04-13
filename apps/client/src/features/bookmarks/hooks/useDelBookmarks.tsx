import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, AppContextType } from '../../../context';

export interface IBookmarksDel {
    isRemoving: boolean;
    isError: boolean;
    delBookmark: (id: string) => any;
}

export function useDelBookmark(): IBookmarksDel {
    const { api } = useContext<AppContextType>(AppContext);
    const queryClient: QueryClient = useQueryClient();

    async function removeBookmark(id: string) {
        return api?.bookmarks.delete(id);
    }

    const { isLoading: isRemoving, isError, mutate: delBookmark } = useMutation(removeBookmark, {
        onSuccess: () => {
            queryClient.invalidateQueries(['bookmarks']);
        },
    });

    return { isRemoving, isError, delBookmark };
}

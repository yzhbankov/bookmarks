import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, AppContextType } from '../../../context';
import { IBookmarkUpdate } from '../../../models';

export interface IBookmarkUpdateHook {
    isLoading: boolean;
    isError: boolean;
    updateBookmark: (data: IBookmarkUpdate) => any;
}

export function useUpdateBookmark(): IBookmarkUpdateHook {
    const { api } = useContext<AppContextType>(AppContext);
    const queryClient: QueryClient = useQueryClient();

    async function postBookmark(data: IBookmarkUpdate) {
        return api?.bookmarks.edit(data);
    }

    const { isLoading, isError, mutate: updateBookmark } = useMutation(postBookmark, {
        onSuccess: () => {
            queryClient.invalidateQueries(['bookmarks']);
        },
    });

    return { isLoading, isError, updateBookmark };
}

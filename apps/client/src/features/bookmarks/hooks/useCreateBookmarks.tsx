import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, AppContextType } from '../../../context';
import { IBookmark } from '../../../models';

export interface IBookmarkAdd {
    isAdding: boolean;
    isError: boolean;
    addBookmark: (bookmark: IBookmark) => any;
}

export function useCreateBookmark(): IBookmarkAdd {
    const { api } = useContext<AppContextType>(AppContext);
    const queryClient: QueryClient = useQueryClient();

    async function postBookmark(data: IBookmark) {
        return api?.bookmarks.create(data);
    }

    const { isLoading: isAdding, isError, mutate: addBookmark } = useMutation(postBookmark, {
        onSuccess: () => {
            queryClient.invalidateQueries(['bookmarks']);
        },
    });

    return { isAdding, isError, addBookmark };
}

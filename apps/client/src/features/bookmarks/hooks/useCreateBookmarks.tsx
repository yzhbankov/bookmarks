import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, AppContextType } from '../../../context';
import { IBookmarkCreate } from '../../../models';

export interface IBookmarkAdd {
    isLoading: boolean;
    isError: boolean;
    addBookmark: (bookmark: IBookmarkCreate) => any;
}

export function useCreateBookmark(): IBookmarkAdd {
    const { api } = useContext<AppContextType>(AppContext);
    const queryClient: QueryClient = useQueryClient();

    async function postBookmark(data: IBookmarkCreate) {
        return api?.bookmarks.create(data);
    }

    const { isLoading, isError, mutate: addBookmark } = useMutation(postBookmark, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['bookmarks']);
        },
    });

    return { isLoading, isError, addBookmark };
}

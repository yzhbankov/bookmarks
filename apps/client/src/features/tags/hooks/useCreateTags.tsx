import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, AppContextType } from '../../../context';
import { ITagPostBody } from '../../../models';

export interface ITagAdd {
    isLoading: boolean;
    isError: boolean;
    addTag: (tag: ITagPostBody) => any;
}

export function useCreateTag(): ITagAdd {
    const { api } = useContext<AppContextType>(AppContext);
    const queryClient: QueryClient = useQueryClient();

    async function postTag(data: ITagPostBody) {
        return api?.tags.create(data);
    }

    const { isLoading, isError, mutate: addTag } = useMutation(postTag, {
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
        },
    });

    return { isLoading, isError, addTag };
}

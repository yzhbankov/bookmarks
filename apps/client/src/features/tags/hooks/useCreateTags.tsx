import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, AppContextType } from '../../../context';
import { ITagAddBody } from '../../../models';

export interface ITagAdd {
    isAdding: boolean;
    isError: boolean;
    addTag: (tag: ITagAddBody) => any;
}

export function useCreateTag(): ITagAdd {
    const { api } = useContext<AppContextType>(AppContext);
    const queryClient: QueryClient = useQueryClient();

    async function postTag(data: ITagAddBody) {
        return api?.tags.create(data);
    }

    const { isLoading: isAdding, isError, mutate: addTag } = useMutation(postTag, {
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
        },
    });

    return { isAdding, isError, addTag };
}

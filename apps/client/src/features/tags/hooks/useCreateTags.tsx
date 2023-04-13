import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, AppContextType } from '../../../context';
import { ITag } from '../../../models';

export interface ITagAdd {
    isAdding: boolean;
    isError: boolean;
    addTag: (bookmark: ITag) => any;
}

export function useCreateTag(): ITagAdd {
    const { api } = useContext<AppContextType>(AppContext);
    const queryClient: QueryClient = useQueryClient();

    async function postTag(data: ITag) {
        return api?.tags.create(data);
    }

    const { isLoading: isAdding, isError, mutate: addTag } = useMutation(postTag, {
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
        },
    });

    return { isAdding, isError, addTag };
}

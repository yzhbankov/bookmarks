import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, AppContextType } from '../../../context';

export interface ITagsDel {
    isRemoving: boolean;
    isError: boolean;
    delTag: (id: string) => any;
}

export function useDelTags(): ITagsDel {
    const { api } = useContext<AppContextType>(AppContext);
    const queryClient: QueryClient = useQueryClient();

    async function removeTag(id: string) {
        return api?.tags.delete(id);
    }

    const { isLoading: isRemoving, isError, mutate: delTag } = useMutation(removeTag, {
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
        },
    });

    return { isRemoving, isError, delTag };
}

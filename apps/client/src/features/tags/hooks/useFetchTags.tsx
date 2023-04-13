import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { AppContext, AppContextType } from '../../../context';

export interface ITagsFetch {
    data: any;
    isFetching: boolean;
    isError: boolean;
}

export function useFetchTags(): ITagsFetch {
    const { api } = useContext<AppContextType>(AppContext);

    const fetchTags = () => {
        return api?.tags.readList();
    };

    const { data, isFetching, isError }: UseQueryResult = useQuery(['tags'], fetchTags, {
        keepPreviousData: true,
    });

    return { data, isFetching, isError };
}

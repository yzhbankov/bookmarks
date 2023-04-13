import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { AppContext, AppContextType } from '../../../context';

export interface IBookmarksFetch {
    data: any;
    isFetching: boolean;
    isError: boolean;
}

export function useFetchBookmarks(): IBookmarksFetch {
    const { api } = useContext<AppContextType>(AppContext);

    const fetchBookmarks = () => {
        return api?.bookmarks.readList();
    };

    const { data, isFetching, isError }: UseQueryResult = useQuery(['bookmarks'], fetchBookmarks, {
        keepPreviousData: true,
    });

    return { data, isFetching, isError };
}

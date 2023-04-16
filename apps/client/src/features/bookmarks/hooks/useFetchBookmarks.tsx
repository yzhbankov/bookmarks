import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { AppContext, AppContextType } from '../../../context';
import { useFetchTags } from '../../tags/hooks';
import { ITag, IBookmark } from '../../../models';

export interface IBookmarksFetch {
    bookmarks: any;
    isFetching: boolean;
    isError: boolean;
}

export function useFetchBookmarks(): IBookmarksFetch {
    const { tags } = useFetchTags();
    const { api } = useContext<AppContextType>(AppContext);
    const tagsMap = tags?.reduce((memo: { [key: string]: ITag }, tag) => {
        memo[tag.id] = tag;
        return memo;
    }, {});

    const fetchBookmarks = () => {
        return api?.bookmarks.readList();
    };

    const { data, isFetching, isError }: UseQueryResult<IBookmark[]> = useQuery(['bookmarks'], fetchBookmarks, {
        keepPreviousData: true,
    });

    const bookmarks =
        data && data.map((bookmark: IBookmark) => ({ ...bookmark, tagName: tagsMap && tagsMap[bookmark.tag]?.name }));

    return { bookmarks, isFetching, isError };
}

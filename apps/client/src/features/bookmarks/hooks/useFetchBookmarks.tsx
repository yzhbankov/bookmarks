import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { AppContext, AppContextType } from '../../../context';
import { useFetchTags } from '../../tags/hooks';
import { ITag, IBookmark, IBookmarkTable } from '../../../models';

export interface IBookmarksFetch {
    bookmarks: IBookmarkTable[];
    isLoading: boolean;
    isError: boolean;
    getFiltered: (id: string | null) => IBookmarkTable[];
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

    const { isLoading, data, isError }: UseQueryResult<IBookmark[]> = useQuery(['bookmarks'], fetchBookmarks, {
        keepPreviousData: true,
    });

    const getFiltered = (selectedTag: string | null) => {
        return data
            ? data.reduce((memo: IBookmarkTable[], bookmark: IBookmark) => {
                  if (!selectedTag) {
                      memo.push({ ...bookmark, tagName: tagsMap && tagsMap[bookmark.tag]?.name });
                  } else if (bookmark.tag === selectedTag) {
                      memo.push({ ...bookmark, tagName: tagsMap && tagsMap[bookmark.tag]?.name });
                  }
                  return memo;
              }, [])
            : [];
    };

    const bookmarks = data
        ? data.map((bookmark: IBookmark) => ({ ...bookmark, tagName: tagsMap && tagsMap[bookmark.tag]?.name }))
        : [];

    return { bookmarks, isLoading, isError, getFiltered };
}

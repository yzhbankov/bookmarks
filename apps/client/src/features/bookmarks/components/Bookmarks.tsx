import React, { useContext, useState } from 'react';
import { BookmarkCreateDialog } from './BookmarkCreateDialog';
import { BookmarkErrorDialog } from './BookmarkErrorDialog';
import { BookmarksTable } from './BookmarksTable';
import { Search } from './Search';
import { ButtonsContainer } from './ButtonsContainer';
import { useFetchBookmarks } from '../hooks';
import { TagsContext } from '../../../context';
import { IBookmarkTable } from '../../../models';

function getSearched(data: IBookmarkTable[], searchText: string): IBookmarkTable[] {
    if (!searchText) return data;
    return data
        ? data.reduce((memo: IBookmarkTable[], bookmark: IBookmarkTable) => {
              const includesInUrl: boolean = (bookmark.url || '').toLowerCase().includes(searchText);
              const includesInDescription: boolean = (bookmark.description || '').toLowerCase().includes(searchText);
              const includesInTitle: boolean = (bookmark.title || '').toLowerCase().includes(searchText);

              if (includesInUrl || includesInDescription || includesInTitle) {
                  memo.push(bookmark);
              }
              return memo;
          }, [])
        : [];
}

export function Bookmarks() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const { bookmarks, isLoading, getFiltered } = useFetchBookmarks();
    const selected = useContext(TagsContext);
    const filteredBookmarks = getFiltered(selected);
    const searchedBookmarks = getSearched(filteredBookmarks, searchText);

    return (
        <>
            <div className="flex my-2">
                <div className="basis-1/2">
                    <ButtonsContainer handleClickAddButton={() => setOpenCreateModal(true)} bookmarks={bookmarks} />
                </div>
                <div className="basis-1/2">
                    <Search handleChange={(val) => setSearchText(val)} />
                </div>
            </div>
            <BookmarksTable bookmarks={searchedBookmarks} isLoading={isLoading} />
            <BookmarkCreateDialog
                isOpen={openCreateModal}
                handleOpen={(val: boolean) => setOpenCreateModal(val)}
                handleError={() => setOpenErrorModal(true)}
                bookmarks={bookmarks}
            />
            <BookmarkErrorDialog isOpen={openErrorModal} handleOpen={(val: boolean) => setOpenErrorModal(val)} />
        </>
    );
}

Bookmarks.propTypes = {};

Bookmarks.defaultProps = {};

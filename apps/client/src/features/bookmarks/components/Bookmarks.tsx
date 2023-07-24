import React, { useContext, useState } from 'react';
import { BookmarkCreateDialog } from './BookmarkCreateDialog';
import { BookmarksTable } from './BookmarksTable';
import { CommonButton } from '../../../components';
import { Search } from './Search';
import { useExportImportBookmarks, useFetchBookmarks } from '../hooks';
import { TagsContext } from '../../../context';
import { IBookmarkTable } from '../../../models';

function getSearched(data: IBookmarkTable[], searchText: string): IBookmarkTable[] {
    if (!searchText) return data;
    return data
        ? data.reduce((memo: IBookmarkTable[], bookmark: IBookmarkTable) => {
              const includesInUrl: boolean = bookmark.url.toLowerCase().includes(searchText);
              const includesInDescription: boolean = bookmark.description.toLowerCase().includes(searchText);
              const includesInTitle: boolean = bookmark.title.toLowerCase().includes(searchText);

              if (includesInUrl || includesInDescription || includesInTitle) {
                  memo.push(bookmark);
              }
              return memo;
          }, [])
        : [];
}

export function Bookmarks() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const { bookmarks, getFiltered } = useFetchBookmarks();
    const selected = useContext(TagsContext);
    const { exportFile, importFile } = useExportImportBookmarks();
    const filteredBookmarks = getFiltered(selected);
    const searchedBookmarks = getSearched(filteredBookmarks, searchText);

    return (
        <>
            <div className="flex my-2">
                <div className="basis-1/2">
                    <CommonButton
                        className="w-[146px]"
                        title="Add bookmark"
                        handleClick={() => setOpenCreateModal(true)}
                    />
                    <CommonButton
                        className="ml-2 mr-1 bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500"
                        title="Export"
                        handleClick={() => exportFile(bookmarks)}
                    />
                    <CommonButton
                        className="ml-1 bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500"
                        title="Import"
                        handleClick={() => importFile()}
                    />
                </div>
                <div className="basis-1/2">
                    <Search handleChange={(val) => setSearchText(val)} />
                </div>
            </div>
            <BookmarksTable bookmarks={searchedBookmarks} />
            <BookmarkCreateDialog isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
        </>
    );
}

Bookmarks.propTypes = {};

Bookmarks.defaultProps = {};

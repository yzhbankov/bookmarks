import React, { useState } from 'react';
import { IBookmarksFetch, useFetchBookmarks } from '../hooks';
import { Table } from '../../../components';
import { BookmarkCreateDialog } from './BookmarkCreateDialog';

export function Bookmarks() {
    const { bookmarks, isError, isFetching }: IBookmarksFetch = useFetchBookmarks();
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const columns = [
        { key: 'url', header: 'URL' },
        { key: 'description', header: 'Description' },
        { key: 'tagName', header: 'Tag' },
    ];
    return (
        <div>
            <div className="text-center">Bookmarks components</div>
            <div className="text-center my-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setOpenCreateModal(true)}
                >
                    Add Bookmark
                </button>
            </div>
            <Table data={bookmarks} columns={columns} />
            <BookmarkCreateDialog isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
        </div>
    );
}

Bookmarks.propTypes = {};

Bookmarks.defaultProps = {};

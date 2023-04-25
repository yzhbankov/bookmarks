import React, { useState } from 'react';
import { BookmarkCreateDialog } from './BookmarkCreateDialog';
import { BookmarksTable } from './BookmarksTable';
import { CommonButton } from '../../../components';
import { Search } from './Search';

export function Bookmarks() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    return (
        <div>
            <div className="flex-none sm:flex my-2">
                <div className="basis-1/2">
                    <CommonButton title="Add bookmark" handleClick={() => setOpenCreateModal(true)} />
                </div>
                <div className="basis-1/2">
                    <Search handleChange={(val) => setSearchText(val)} />
                </div>
            </div>
            <BookmarksTable searchText={searchText} />
            <BookmarkCreateDialog isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
        </div>
    );
}

Bookmarks.propTypes = {};

Bookmarks.defaultProps = {};

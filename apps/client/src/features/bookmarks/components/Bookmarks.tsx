import React, { useState } from 'react';
import { BookmarkCreateDialog } from './BookmarkCreateDialog';
import { BookmarksTable } from './BookmarksTable';
import { CommonButton } from '../../../components';

export function Bookmarks() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

    return (
        <div>
            <div className="text-center">Bookmarks components</div>
            <div className="text-center my-2">
                <CommonButton title="Add bookmark" handleClick={() => setOpenCreateModal(true)} />
            </div>
            <BookmarksTable />
            <BookmarkCreateDialog isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
        </div>
    );
}

Bookmarks.propTypes = {};

Bookmarks.defaultProps = {};

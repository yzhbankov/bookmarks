import React, { useState } from 'react';
import { ITagsFetch, useFetchTags } from '../hooks';
import { TagCreateDialog } from './TagCreateDialog';
import { TagDeleteDialog } from './TagDeleteDialog';

export function Tags() {
    const tagsFetch: ITagsFetch = useFetchTags();
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    return (
        <div>
            <div className="text-center">Tags components</div>
            <div>Tags:</div>
            <div>Fetch: {tagsFetch.isFetching}</div>
            <div>Error: {tagsFetch.isError}</div>
            <div>List: {JSON.stringify(tagsFetch.data)}</div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    setOpenCreateModal(true);
                }}
            >
                Create Tag
            </button>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    setOpenDeleteModal(true);
                }}
            >
                Remove Tag
            </button>
            <TagCreateDialog isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
            <TagDeleteDialog
                isOpen={openDeleteModal}
                handleOpen={(val: boolean) => setOpenDeleteModal(val)}
                tagId={tagsFetch.data && tagsFetch.data[0] ? tagsFetch.data[0].id : null}
            />
        </div>
    );
}

Tags.propTypes = {};

Tags.defaultProps = {};

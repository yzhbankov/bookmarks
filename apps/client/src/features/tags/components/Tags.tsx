import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ITagsFetch, useFetchTags } from '../hooks';
import { TagCreateModal } from './TagCreateModal';

export function Tags() {
    const tagsFetch: ITagsFetch = useFetchTags();
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

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
            <TagCreateModal isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
        </div>
    );
}

Tags.propTypes = {};

Tags.defaultProps = {};

import React, { useState } from 'react';
import { ITagsFetch, useFetchTags } from '../hooks';
import { TagCreateDialog } from './TagCreateDialog';
import { TagsList } from './TagsList';

export function Tags() {
    const { data }: ITagsFetch = useFetchTags();
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

    return (
        <div className="my-6 sm:flex">
            <div className="basis-1/5" />
            <div className="basis-1/5 text-center my-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setOpenCreateModal(true)}
                >
                    Create Tag
                </button>
            </div>
            <div className="basis-3/5 my-2">
                <TagsList tags={data} />
            </div>
            <TagCreateDialog isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
        </div>
    );
}

Tags.propTypes = {};

Tags.defaultProps = {};

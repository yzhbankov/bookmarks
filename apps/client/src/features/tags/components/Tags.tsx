import React, { useState } from 'react';
import { TagCreateDialog } from './TagCreateDialog';
import { CommonButton } from '../../../components';
import { TagsContainer } from './TagsContainer';

export function Tags() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

    return (
        <div className="flex">
            <div className="w-1/2 my-2">
                <CommonButton
                    title="Create Tag"
                    handleClick={() => setOpenCreateModal(true)}
                    className="w-[146px] bg-blue-500 hover:bg-blue-700 text-white"
                />
            </div>
            <div className="w-1/2 my-2">
                <TagsContainer />
            </div>
            <TagCreateDialog isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
        </div>
    );
}

Tags.propTypes = {};

Tags.defaultProps = {};

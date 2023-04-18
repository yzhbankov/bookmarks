import React, { useState } from 'react';
import { ITagsFetch, useFetchTags } from '../hooks';
import { TagCreateDialog } from './TagCreateDialog';
import { TagsList } from './TagsList';
import { CommonButton } from '../../../components';

export function Tags() {
    const { tags }: ITagsFetch = useFetchTags();
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

    return (
        <div>
            <div className="text-center my-2">
                <CommonButton title="Create Tag" handleClick={() => setOpenCreateModal(true)} />
            </div>
            <div className="text-center">
                <TagsList tags={tags} />
            </div>
            <TagCreateDialog isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
        </div>
    );
}

Tags.propTypes = {};

Tags.defaultProps = {};

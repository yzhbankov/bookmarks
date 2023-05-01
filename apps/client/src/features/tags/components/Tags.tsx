import React, { useState } from 'react';
import { useMediaQuery } from '../../../hooks';
import { ITagsFetch, useFetchTags } from '../hooks';
import { TagCreateDialog } from './TagCreateDialog';
import { TagsList } from './TagsList';
import { TagsListMobile } from './TagsListMobile';
import { CommonButton } from '../../../components';

export function Tags() {
    const { tags }: ITagsFetch = useFetchTags();
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return (
        <div className="flex flex-row">
            <div className="basis-1/2 my-2">
                <CommonButton title="Create Tag" handleClick={() => setOpenCreateModal(true)} className="w-[146px]" />
            </div>
            <div className="basis-1/2 my-2">
                {isDesktop && <TagsList tags={tags} />}
                {!isDesktop && <TagsListMobile tags={tags} />}
            </div>
            <TagCreateDialog isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
        </div>
    );
}

Tags.propTypes = {};

Tags.defaultProps = {};

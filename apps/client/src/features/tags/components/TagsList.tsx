import React from 'react';
import PropTypes from 'prop-types';
import { TagButton } from './TagButton';
import { ITag } from '../../../models';
import { useDelTags, useSelectTag } from '../hooks';

type TagsListType = {
    tags: ITag[] | undefined;
};

export function TagsList({ tags }: TagsListType) {
    const { selectedTag, saveStoreTag, clearStoreTag } = useSelectTag();
    const { delTag, isRemoving } = useDelTags();

    if (!tags) return null;
    return (
        <>
            {tags.map((tag: any) => (
                <TagButton
                    key={tag.id}
                    id={tag.id}
                    checked={selectedTag === tag.id}
                    name={tag.name}
                    title={tag.description}
                    isLoading={isRemoving}
                    handleCheck={() => {
                        if (selectedTag === tag.id) {
                            clearStoreTag();
                        } else {
                            saveStoreTag(tag.id);
                        }
                    }}
                    handleDelete={async () => {
                        await delTag(tag.id);
                        if (selectedTag === tag.id) {
                            clearStoreTag();
                        }
                    }}
                />
            ))}
        </>
    );
}

TagsList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.object),
};

TagsList.defaultProps = {
    tags: [],
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TagButton } from './TagButton';
import { ITag } from '../../../models';
import { useDelTags } from '../hooks';

type TagsListType = {
    tags: ITag[] | undefined;
};

export function TagsList({ tags }: TagsListType) {
    const [checked, setChecked] = useState<string>('');
    const { delTag, isRemoving } = useDelTags();

    if (!tags) return null;
    return (
        <>
            {tags.map((tag: any) => (
                <TagButton
                    key={tag.id}
                    id={tag.id}
                    checked={checked === tag.id}
                    name={tag.name}
                    title={tag.description}
                    isLoading={isRemoving}
                    handleCheck={() => {
                        if (checked === tag.id) {
                            setChecked('');
                        } else {
                            setChecked(tag.id);
                        }
                    }}
                    handleDelete={async () => {
                        await delTag(tag.id);
                        if (checked === tag.id) {
                            setChecked('');
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

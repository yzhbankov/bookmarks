import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { TagButton } from './TagButton';
import { ITag } from '../../../models';
import { useDelTags } from '../hooks';
import { TagsDispatchContext, TagsContext } from '../../../context';

type TagsListType = {
    tags: ITag[] | undefined;
};

export function TagsList({ tags }: TagsListType) {
    const dispatch = useContext(TagsDispatchContext);
    const selected = useContext(TagsContext);
    const { delTag, isLoading } = useDelTags();
    const [deleted, setDeleted] = useState('');

    if (!tags) return null;
    return (
        <>
            {tags.map((tag: any) => (
                <TagButton
                    key={tag.id}
                    id={tag.id}
                    checked={selected === tag.id}
                    name={tag.name}
                    title={tag.description}
                    isLoading={isLoading && deleted === tag.id}
                    handleCheck={() => {
                        if (selected === tag.id) {
                            dispatch({ type: 'clear' });
                        } else {
                            dispatch({ type: 'check', payload: tag.id });
                        }
                    }}
                    handleDelete={async () => {
                        setDeleted(tag.id);
                        await delTag(tag.id);
                        if (selected === tag.id) {
                            dispatch({ type: 'clear' });
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

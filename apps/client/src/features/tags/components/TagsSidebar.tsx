import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { useFetchTags, useDelTags } from '../hooks';
import { TagsDispatchContext, TagsContext } from '../../../context';
import { ITag } from '../../../models';
import { SpinnerIcon } from '../../../components';
import { Size, Color } from '../../../utils';

export function TagsSidebar() {
    const { tags, isLoading } = useFetchTags();
    const dispatch = useContext(TagsDispatchContext);
    const selected = useContext(TagsContext);
    const { delTag, isLoading: isDeleting } = useDelTags();
    const [deletingId, setDeletingId] = useState('');

    if (isLoading) {
        return (
            <div className="py-4 flex justify-center">
                <SpinnerIcon size={Size.sm} color={Color.blue} />
            </div>
        );
    }

    if (!tags || tags.length === 0) {
        return (
            <div className="py-4 text-center text-gray-400 text-sm">
                No tags yet
            </div>
        );
    }

    const handleToggleTag = (tagId: string) => {
        if ((selected || '').includes(tagId)) {
            dispatch({ type: 'clear', payload: tagId });
        } else {
            dispatch({ type: 'check', payload: tagId });
        }
    };

    const handleDeleteTag = async (tagId: string) => {
        setDeletingId(tagId);
        await delTag(tagId);
        if ((selected || '').includes(tagId)) {
            dispatch({ type: 'clear', payload: tagId });
        }
        setDeletingId('');
    };

    return (
        <nav className="space-y-1">
            {tags.map((tag: ITag) => {
                const isSelected = (selected || '').includes(tag.id);
                const isCurrentlyDeleting = isDeleting && deletingId === tag.id;

                return (
                    <div
                        key={tag.id}
                        className={classNames(
                            'group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors',
                            isSelected
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-100'
                        )}
                        onClick={() => handleToggleTag(tag.id)}
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <span
                                className={classNames(
                                    'w-2 h-2 rounded-full flex-shrink-0',
                                    isSelected ? 'bg-blue-500' : 'bg-gray-300'
                                )}
                            />
                            <span className="text-sm font-medium truncate" title={tag.description || tag.name}>
                                {tag.name}
                            </span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTag(tag.id);
                            }}
                            className={classNames(
                                'p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity',
                                'hover:bg-gray-200 text-gray-400 hover:text-red-500'
                            )}
                            title="Delete tag"
                        >
                            {isCurrentlyDeleting ? (
                                <SpinnerIcon size={Size.xs} color={Color.blue} />
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                );
            })}
        </nav>
    );
}

import React, { useState, useContext } from 'react';
import { TagCreateDialog } from './TagCreateDialog';
import { TagsContext, TagsDispatchContext } from '../../../context';
import { useFetchTags, useDelTags } from '../hooks';
import { ITag } from '../../../models';
import { SpinnerIcon } from '../../../components';
import { Size, Color } from '../../../utils';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
    default: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    green: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-500' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    red: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-500' },
};

const COLOR_NAMES = Object.keys(CATEGORY_COLORS);

function getCategoryColor(index: number) {
    const colorName = COLOR_NAMES[index % COLOR_NAMES.length];
    return CATEGORY_COLORS[colorName];
}

export function Tags() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const selected = useContext(TagsContext);
    const dispatch = useContext(TagsDispatchContext);
    const { tags, isLoading } = useFetchTags();
    const { delTag, isLoading: isDeleting } = useDelTags();

    const handleClearAll = () => {
        if (selected) {
            const tagIds = selected.split(';').filter(Boolean);
            tagIds.forEach((id: string) => {
                dispatch({ type: 'clear', payload: id });
            });
        }
    };

    const handleToggleCategory = (tagId: string) => {
        if ((selected || '').includes(tagId)) {
            dispatch({ type: 'clear', payload: tagId });
        } else {
            dispatch({ type: 'check', payload: tagId });
        }
    };

    const handleDeleteCategory = async (tagId: string) => {
        await delTag(tagId);
        if ((selected || '').includes(tagId)) {
            dispatch({ type: 'clear', payload: tagId });
        }
        setDeleteConfirmId(null);
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* All button */}
            <button
                onClick={handleClearAll}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    !selected
                        ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
                All
            </button>

            {/* Category pills */}
            {isLoading ? (
                <SpinnerIcon size={Size.sm} color={Color.blue} />
            ) : (
                tags?.map((tag: ITag, index: number) => {
                    const isSelected = (selected || '').includes(tag.id);
                    const colors = getCategoryColor(index);

                    return (
                        <div key={tag.id} className="relative group">
                            {deleteConfirmId === tag.id ? (
                                <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded-lg px-3 py-1.5">
                                    <span className="text-sm text-rose-600 mr-1">Delete?</span>
                                    <button
                                        onClick={() => handleDeleteCategory(tag.id)}
                                        disabled={isDeleting}
                                        className="px-2.5 py-1 text-xs bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-md hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 font-medium"
                                    >
                                        {isDeleting ? <SpinnerIcon size={Size.xs} color={Color.blue} /> : 'Yes'}
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirmId(null)}
                                        className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-white rounded-md transition-colors"
                                    >
                                        No
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleToggleCategory(tag.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                                        isSelected
                                            ? `${colors.bg} ${colors.text} ring-2 ring-offset-1 ring-current`
                                            : `${colors.bg} ${colors.text} hover:ring-2 hover:ring-offset-1 hover:ring-current`
                                    }`}
                                >
                                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${colors.dot}`} />
                                    {tag.name}
                                </button>
                            )}
                            {deleteConfirmId !== tag.id && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteConfirmId(tag.id);
                                    }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-500"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    );
                })
            )}

            {/* Add Category button */}
            <button
                onClick={() => setOpenCreateModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-blue-300 rounded-lg text-xs sm:text-sm font-medium text-blue-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add Category</span>
                <span className="sm:hidden">Add</span>
            </button>

            <TagCreateDialog isOpen={openCreateModal} handleOpen={(val: boolean) => setOpenCreateModal(val)} />
        </div>
    );
}

Tags.propTypes = {};

Tags.defaultProps = {};

import React, { useState, ChangeEvent } from 'react';
import { IBookmarkTable, ITag } from '../../../models';
import { useUpdateBookmark, useDelBookmark } from '../hooks';
import { useFetchTags } from '../../tags/hooks';
import { SpinnerIcon } from '../../../components';
import { Size, Color } from '../../../utils';

type BookmarkCardProps = {
    bookmark: IBookmarkTable;
};

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
    const { tags } = useFetchTags();
    const { updateBookmark } = useUpdateBookmark();
    const { delBookmark, isLoading: isDeleting } = useDelBookmark();
    const [isHovered, setIsHovered] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = async () => {
        await delBookmark(bookmark.id);
        setShowDeleteConfirm(false);
    };

    const handleTagChange = (e: ChangeEvent<HTMLSelectElement>) => {
        updateBookmark({ ...bookmark, tag: e.target.value });
    };

    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return url;
        }
    };

    return (
        <div
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-card-hover hover:border-gray-300 transition-all duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowDeleteConfirm(false);
            }}
        >
            {/* Header with favicon and actions */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 min-w-0 flex-1 group"
                >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <img
                            src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=32`}
                            alt=""
                            className="w-5 h-5"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>';
                            }}
                        />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {bookmark.title}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                            {getDomain(bookmark.url)}
                        </p>
                    </div>
                </a>

                {/* Delete button */}
                <div className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    {showDeleteConfirm ? (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? <SpinnerIcon size={Size.xs} color={Color.blue} /> : 'Delete'}
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete bookmark"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Description */}
            {bookmark.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={bookmark.description}>
                    {bookmark.description}
                </p>
            )}

            {/* Tag selector */}
            <div className="flex items-center justify-between">
                <select
                    value={bookmark.tag || ''}
                    onChange={handleTagChange}
                    className="text-sm px-2 py-1 border border-gray-200 rounded-lg text-gray-600 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
                >
                    <option value="">No tag</option>
                    {tags?.map((tag: ITag) => (
                        <option key={tag.id} value={tag.id}>
                            {tag.name}
                        </option>
                    ))}
                </select>

                <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                    Open
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

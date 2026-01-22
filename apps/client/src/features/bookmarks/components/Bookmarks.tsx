import React, { useContext, useState, useRef, ChangeEvent } from 'react';
import { BookmarkCreateDialog } from './BookmarkCreateDialog';
import { BookmarkErrorDialog } from './BookmarkErrorDialog';
import { BookmarkEditDialog } from './BookmarkEditDialog';
import { useFetchBookmarks, useExportImportBookmarks, useDelBookmark } from '../hooks';
import { useFetchTags } from '../../tags/hooks';
import { TagsContext } from '../../../context';
import { IBookmarkTable, ITag } from '../../../models';
import { SpinnerIcon } from '../../../components';
import { Size, Color } from '../../../utils';

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
    default: { bg: 'bg-gray-100', text: 'text-gray-700' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
    green: { bg: 'bg-green-100', text: 'text-green-700' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-700' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    red: { bg: 'bg-red-100', text: 'text-red-700' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-700' },
};

const COLOR_NAMES = Object.keys(CATEGORY_COLORS);

function getCategoryColor(index: number) {
    const colorName = COLOR_NAMES[index % COLOR_NAMES.length];
    return CATEGORY_COLORS[colorName];
}

function getSearched(data: IBookmarkTable[], searchText: string): IBookmarkTable[] {
    if (!searchText) return data;
    return data
        ? data.reduce((memo: IBookmarkTable[], bookmark: IBookmarkTable) => {
              const includesInUrl: boolean = (bookmark.url || '').toLowerCase().includes(searchText);
              const includesInDescription: boolean = (bookmark.description || '').toLowerCase().includes(searchText);
              const includesInTitle: boolean = (bookmark.title || '').toLowerCase().includes(searchText);

              if (includesInUrl || includesInDescription || includesInTitle) {
                  memo.push(bookmark);
              }
              return memo;
          }, [])
        : [];
}

export function Bookmarks() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
    const [editBookmark, setEditBookmark] = useState<IBookmarkTable | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const { bookmarks, isLoading, getFiltered } = useFetchBookmarks();
    const { tags } = useFetchTags();
    const selected = useContext(TagsContext);
    const filteredBookmarks = getFiltered(selected);
    const searchedBookmarks = getSearched(filteredBookmarks, searchText);
    const { exportFile, importFile } = useExportImportBookmarks();
    const { delBookmark, isLoading: isDeleting } = useDelBookmark();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target && event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const contents: any = e.target && e.target.result;
            importFile(JSON.parse(contents));
        };
        reader.readAsText(file);
    };

    const handleDelete = async (bookmarkId: string) => {
        await delBookmark(bookmarkId);
        setDeleteConfirmId(null);
    };

    const getCategoryName = (tagId: string | undefined) => {
        if (!tagId || !tags) return null;
        const tag = tags.find((t: ITag) => t.id === tagId);
        return tag ? tag.name : null;
    };

    const getCategoryIndex = (tagId: string | undefined) => {
        if (!tagId || !tags) return 0;
        return tags.findIndex((t: ITag) => t.id === tagId);
    };

    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return url;
        }
    };

    return (
        <div>
            {/* Header with Search and Actions */}
            <div className="flex flex-col gap-3 p-3 sm:p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                        />
                        {searchText && (
                            <button
                                onClick={() => setSearchText('')}
                                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Actions */}
                    <button
                        onClick={() => setOpenCreateModal(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-sm hover:shadow-md text-sm font-medium whitespace-nowrap"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden sm:inline">Add Bookmark</span>
                        <span className="sm:hidden">Add</span>
                    </button>
                    <button
                        onClick={() => exportFile(bookmarks)}
                        className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Export bookmarks"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                    </button>
                    <label className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" title="Import bookmarks">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".json"
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-16">
                    <SpinnerIcon size={Size.xl} color={Color.blue} />
                </div>
            )}

            {/* Empty State */}
            {!isLoading && searchedBookmarks.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    {searchText ? (
                        <>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters</p>
                        </>
                    ) : bookmarks.length === 0 ? (
                        <>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No bookmarks yet</h3>
                            <p className="text-gray-500 mb-4">Start by adding your first bookmark</p>
                            <button
                                onClick={() => setOpenCreateModal(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-sm hover:shadow-md font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add your first bookmark
                            </button>
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No bookmarks in this category</h3>
                            <p className="text-gray-500">Try selecting different categories or clear the filter</p>
                        </>
                    )}
                </div>
            )}

            {/* Bookmarks Table - Desktop */}
            {!isLoading && searchedBookmarks.length > 0 && (
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="text-left px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">URL</th>
                                <th className="text-left px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="text-right px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {searchedBookmarks.map((bookmark) => {
                                const categoryName = getCategoryName(bookmark.tag);
                                const categoryIndex = getCategoryIndex(bookmark.tag);
                                const colors = getCategoryColor(categoryIndex);

                                return (
                                    <tr
                                        key={bookmark.id}
                                        className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                                        onClick={() => window.open(bookmark.url, '_blank')}
                                    >
                                        <td className="px-3 py-1.5">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=32`}
                                                    alt=""
                                                    className="w-4 h-4 rounded flex-shrink-0"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>';
                                                    }}
                                                />
                                                <span
                                                    className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate"
                                                    title={bookmark.description || bookmark.title}
                                                >
                                                    {bookmark.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-1.5 hidden lg:table-cell">
                                            <span className="text-xs text-gray-500 truncate block max-w-xs">
                                                {getDomain(bookmark.url)}
                                            </span>
                                        </td>
                                        <td className="px-3 py-1.5">
                                            {categoryName ? (
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                                                    {categoryName}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-1.5" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center justify-end gap-0.5">
                                                {deleteConfirmId === bookmark.id ? (
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => handleDelete(bookmark.id)}
                                                            disabled={isDeleting}
                                                            className="px-2 py-0.5 text-xs bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 font-medium"
                                                        >
                                                            {isDeleting ? <SpinnerIcon size={Size.xs} color={Color.blue} /> : 'Yes'}
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirmId(null)}
                                                            className="px-2 py-0.5 text-xs text-gray-500 hover:text-gray-700"
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => setEditBookmark(bookmark)}
                                                            className="p-1 text-amber-500 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirmId(bookmark.id)}
                                                            className="p-1 text-rose-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors"
                                                            title="Delete"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Bookmarks List - Mobile */}
            {!isLoading && searchedBookmarks.length > 0 && (
                <div className="sm:hidden divide-y divide-gray-100">
                    {searchedBookmarks.map((bookmark) => {
                        const categoryName = getCategoryName(bookmark.tag);
                        const categoryIndex = getCategoryIndex(bookmark.tag);
                        const colors = getCategoryColor(categoryIndex);

                        return (
                            <div
                                key={bookmark.id}
                                className="flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50/50 active:bg-blue-100/50 transition-colors cursor-pointer"
                                onClick={() => window.open(bookmark.url, '_blank')}
                            >
                                <img
                                    src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=32`}
                                    alt=""
                                    className="w-8 h-8 rounded-lg bg-gray-100 p-1.5 flex-shrink-0"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>';
                                    }}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-900 truncate">
                                            {bookmark.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-gray-500 truncate">
                                            {getDomain(bookmark.url)}
                                        </span>
                                        {categoryName && (
                                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                                                {categoryName}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                    {deleteConfirmId === bookmark.id ? (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleDelete(bookmark.id)}
                                                disabled={isDeleting}
                                                className="px-2 py-1 text-xs bg-rose-500 text-white rounded"
                                            >
                                                {isDeleting ? '...' : 'Yes'}
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirmId(null)}
                                                className="px-2 py-1 text-xs text-gray-500"
                                            >
                                                No
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setEditBookmark(bookmark)}
                                                className="p-1.5 text-amber-500"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirmId(bookmark.id)}
                                                className="p-1.5 text-rose-400"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Results count footer */}
            {!isLoading && searchedBookmarks.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-200 text-sm text-gray-500">
                    {searchText ? (
                        <span>
                            Found <span className="font-medium text-gray-700">{searchedBookmarks.length}</span> bookmark{searchedBookmarks.length !== 1 ? 's' : ''} matching "{searchText}"
                        </span>
                    ) : (
                        <span>
                            <span className="font-medium text-gray-700">{searchedBookmarks.length}</span> bookmark{searchedBookmarks.length !== 1 ? 's' : ''}
                            {selected && ' in selected categories'}
                        </span>
                    )}
                </div>
            )}

            <BookmarkCreateDialog
                isOpen={openCreateModal}
                handleOpen={(val: boolean) => setOpenCreateModal(val)}
                handleError={() => setOpenErrorModal(true)}
                bookmarks={bookmarks}
            />
            <BookmarkErrorDialog isOpen={openErrorModal} handleOpen={(val: boolean) => setOpenErrorModal(val)} />
            {editBookmark && (
                <BookmarkEditDialog
                    isOpen={!!editBookmark}
                    bookmark={editBookmark}
                    handleOpen={(val: boolean) => !val && setEditBookmark(null)}
                />
            )}
        </div>
    );
}

Bookmarks.propTypes = {};

Bookmarks.defaultProps = {};

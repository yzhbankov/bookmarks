import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useUpdateBookmark } from '../hooks';
import { useFetchTags } from '../../tags/hooks';
import { IBookmarkTable, ITag } from '../../../models';
import { CommonDialog, DialogButton } from '../../../components';

type BookmarkEditDialogProps = {
    isOpen: boolean;
    bookmark: IBookmarkTable;
    handleOpen: (state: boolean) => void;
};

function validate(state: IBookmarkTable): boolean {
    if (state.url.length < 1) return false;
    if (state.title.length < 1) return false;
    return true;
}

export function BookmarkEditDialog({ isOpen, bookmark, handleOpen }: BookmarkEditDialogProps) {
    const [editedBookmark, setEditedBookmark] = useState<IBookmarkTable>(bookmark);
    const { updateBookmark, isLoading } = useUpdateBookmark();
    const { tags } = useFetchTags();

    useEffect(() => {
        setEditedBookmark(bookmark);
    }, [bookmark]);

    const handleOk = async () => {
        await updateBookmark(editedBookmark);
        handleOpen(false);
    };

    const handleCancel = () => {
        handleOpen(false);
        setEditedBookmark(bookmark);
    };

    return (
        <CommonDialog
            onClose={handleCancel}
            isOpen={isOpen}
            title="Edit bookmark"
            content={
                <BookmarkEditForm
                    bookmark={editedBookmark}
                    tags={tags}
                    handleBookmark={(val: IBookmarkTable) => setEditedBookmark(val)}
                    handleOk={handleOk}
                    isLoading={isLoading}
                    valid={validate(editedBookmark)}
                />
            }
        />
    );
}

BookmarkEditDialog.propTypes = {
    isOpen: PropTypes.bool,
    bookmark: PropTypes.object,
    handleOpen: PropTypes.func,
};

BookmarkEditDialog.defaultProps = {
    isOpen: false,
    bookmark: {},
    handleOpen: () => {},
};

type BookmarkEditFormType = {
    bookmark: IBookmarkTable;
    tags: ITag[] | undefined;
    handleBookmark: (val: IBookmarkTable) => void;
    handleOk: () => void;
    isLoading: boolean;
    valid: boolean;
};

function BookmarkEditForm({ bookmark, tags, handleBookmark, handleOk, isLoading, valid }: BookmarkEditFormType) {
    return (
        <form className="w-auto bg-white px-8 pt-6 pb-4 mb-4">
            <div className="mb-4 align-bottom">
                <label className="text-gray-600 text-sm font-bold mb-3 ml-0.5" htmlFor="editBookmarkUrl">
                    URL:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="editBookmarkUrl"
                    type="text"
                    value={bookmark.url}
                    onChange={(e) => handleBookmark({ ...bookmark, url: e.target.value })}
                    placeholder="URL"
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-600 text-sm font-bold mb-3 ml-0.5" htmlFor="editBookmarkTitle">
                    Title:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="editBookmarkTitle"
                    type="text"
                    value={bookmark.title}
                    onChange={(e) => handleBookmark({ ...bookmark, title: e.target.value })}
                    placeholder="Title"
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-600 text-sm font-bold mb-3 ml-0.5" htmlFor="editBookmarkDescription">
                    Description:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="editBookmarkDescription"
                    type="text"
                    value={bookmark.description || ''}
                    onChange={(e) => handleBookmark({ ...bookmark, description: e.target.value })}
                    placeholder="Description"
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-600 text-sm font-bold mb-3 ml-0.5" htmlFor="editBookmarkCategory">
                    Category:
                </label>
                <select
                    id="editBookmarkCategory"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={bookmark.tag || ''}
                    onChange={(e) => handleBookmark({ ...bookmark, tag: e.target.value })}
                >
                    <option value="">No category</option>
                    {tags &&
                        tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <DialogButton
                    handleClick={handleOk}
                    text="Save Changes"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white mt-6 py-2.5 shadow-sm hover:shadow-md transition-all"
                    disabled={isLoading || !valid}
                />
            </div>
        </form>
    );
}

BookmarkEditForm.propTypes = {
    bookmark: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.object),
    handleBookmark: PropTypes.func,
    handleOk: PropTypes.func,
    isLoading: PropTypes.bool,
    valid: PropTypes.bool,
};

BookmarkEditForm.defaultProps = {
    bookmark: {},
    tags: [],
    handleBookmark: () => {},
    handleOk: () => {},
    isLoading: false,
    valid: false,
};

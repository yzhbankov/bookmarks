import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCreateBookmark } from '../hooks';
import { useFetchTags } from '../../tags/hooks';
import { useFetchSpaces } from '../../spaces/hooks';
import { IBookmarkCreate, ITag } from '../../../models';
import { CommonDialog, DialogButton } from '../../../components';
import { validateHttpUrl } from '../../../utils';

type BookmarkCreateDialogType = {
    isOpen: boolean;
    handleOpen: (state: boolean) => void;
};

function validate(state: IBookmarkCreate): boolean {
    if (state.url.length < 1) return false;
    if (state.title.length < 1) return false;
    return true;
}

const initialState: IBookmarkCreate = { url: '', description: '', tag: '', space: '', title: '' };

export function BookmarkCreateDialog({ isOpen, handleOpen }: BookmarkCreateDialogType) {
    const [bookmark, setBookmark] = useState<IBookmarkCreate>(initialState);
    const { spaces } = useFetchSpaces();
    if (!bookmark.space && spaces && spaces[0].id) {
        setBookmark({ ...bookmark, space: spaces && spaces[0].id });
    }
    const { addBookmark, isLoading } = useCreateBookmark();
    const { tags } = useFetchTags();

    const handeOk = async () => {
        await addBookmark(bookmark);
        setBookmark(initialState);
        handleOpen(false);
    };
    const handleCancel = () => {
        handleOpen(false);
        setBookmark(initialState);
    };
    return (
        <CommonDialog
            onClose={handleCancel}
            isOpen={isOpen}
            title="Add a bookmark"
            content={
                <BookmarkCreateForm
                    bookmark={bookmark}
                    tags={tags}
                    handleBookmark={(val: any) => setBookmark(val)}
                    handleOk={handeOk}
                    isLoading={isLoading}
                    valid={validate(bookmark)}
                />
            }
        />
    );
}

type BookmarkCreateFormType = {
    bookmark: { url: string; description: string; tag?: string; title: string };
    tags: ITag[] | undefined;
    handleBookmark: (val: any) => void;
    handleOk: () => void;
    isLoading: boolean;
    valid: boolean;
};

function BookmarkCreateForm({ bookmark, tags, handleBookmark, handleOk, isLoading, valid }: BookmarkCreateFormType) {
    return (
        <form className="w-auto bg-white px-8 pt-6 pb-4 mb-4">
            <div className="mb-4 align-bottom">
                <label className="text-gray-600 text-sm font-bold mb-3 ml-0.5" htmlFor="bookmarkUrl">
                    URL:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bookmarkUrl"
                    type="text"
                    value={bookmark.url}
                    onChange={(e) => {
                        const res = validateHttpUrl(e.target.value);
                        if (res.valid) {
                            handleBookmark({ ...bookmark, url: e.target.value, title: res.title });
                        } else {
                            handleBookmark({ ...bookmark, url: e.target.value });
                        }
                    }}
                    placeholder="URL"
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-600 text-sm font-bold mb-3 ml-0.5" htmlFor="bookmarkTitle">
                    Title:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bookmarkTitle"
                    type="text"
                    value={bookmark.title}
                    onChange={(e) => handleBookmark({ ...bookmark, title: e.target.value })}
                    placeholder="Title"
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-600 text-sm font-bold mb-3 ml-0.5" htmlFor="bookmarkDescription">
                    Description:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bookmarkDescription"
                    type="text"
                    value={bookmark.description}
                    onChange={(e) => handleBookmark({ ...bookmark, description: e.target.value })}
                    placeholder="Description"
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-600 text-sm font-bold mb-3 ml-0.5" htmlFor="bookmarkDescription">
                    Tag:
                </label>
                <select
                    id="tags"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    onChange={(e) => handleBookmark({ ...bookmark, tag: e.target.value })}
                    defaultValue=""
                >
                    <option value="">Choose a tag</option>
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
                    text="Submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white mt-6 py-2.5"
                    disabled={isLoading || !valid}
                />
            </div>
        </form>
    );
}

BookmarkCreateForm.propTypes = {
    bookmark: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.object),
    handleBookmark: PropTypes.func,
    handleOk: PropTypes.func,
    isLoading: PropTypes.bool,
    valid: PropTypes.bool,
};

BookmarkCreateForm.defaultProps = {
    bookmark: {},
    tags: [],
    handleBookmark: () => {},
    handleOk: () => {},
    isLoading: false,
    valid: false,
};

BookmarkCreateDialog.propTypes = {
    isOpen: PropTypes.bool,
    handleOpen: PropTypes.func,
};

BookmarkCreateDialog.defaultProps = {
    isOpen: false,
    handleOpen: () => {},
};

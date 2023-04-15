import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCreateTag } from '../hooks';
import { ITagAddBody } from '../../../models';
import { CommonDialog, DialogButton } from '../../../components';

type TagCreateModalType = {
    isOpen: boolean;
    handleOpen: (state: boolean) => void;
};

const initialState: ITagAddBody = { name: '', description: '' };

function validate(state: ITagAddBody): boolean {
    if (state.name.length < 1) return false;
    return true;
}

export function TagCreateDialog({ isOpen, handleOpen }: TagCreateModalType) {
    const [tag, setTag] = useState<ITagAddBody>(initialState);
    const { addTag, isAdding } = useCreateTag();
    const handeOk = async () => {
        await addTag(tag);
        setTag(initialState);
        handleOpen(false);
    };
    const handleCancel = () => {
        handleOpen(false);
        setTag(initialState);
    };
    const title = 'Create Tag';
    return (
        <CommonDialog
            handleOpen={handleOpen}
            isOpen={isOpen}
            title={title}
            content={
                <TagCreateForm
                    tag={tag}
                    handleTag={(val: any) => setTag(val)}
                    handleCancel={handleCancel}
                    handleOk={handeOk}
                    isAdding={isAdding}
                    valid={validate(tag)}
                />
            }
        />
    );
}

type TagCreateFormType = {
    tag: { name: string; description: string };
    handleTag: (val: any) => void;
    handleCancel: () => void;
    handleOk: () => void;
    isAdding: boolean;
    valid: boolean;
};

function TagCreateForm({ tag, handleTag, handleCancel, handleOk, isAdding, valid }: TagCreateFormType) {
    return (
        <div className="w-full max-w-xs">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tagName">
                        Tag name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="tagName"
                        type="text"
                        value={tag.name}
                        onChange={(e) => handleTag({ ...tag, name: e.target.value })}
                        placeholder="Tag"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        value={tag.description}
                        onChange={(e) => handleTag({ ...tag, description: e.target.value })}
                        placeholder="Description"
                    />
                </div>
                <div>
                    <DialogButton
                        handleClick={handleOk}
                        text="Ok"
                        className="bg-blue-500 hover:bg-blue-700 text-white"
                        disabled={isAdding || !valid}
                    />
                    <DialogButton
                        handleClick={handleCancel}
                        text="Cancel"
                        className="bg-white hover:bg-gray-50 text-gray-900"
                        disabled={isAdding}
                    />
                </div>
            </form>
        </div>
    );
}

TagCreateForm.propTypes = {
    tag: PropTypes.shape({ name: PropTypes.string, description: PropTypes.string }),
    handleTag: PropTypes.func,
};

TagCreateForm.defaultProps = {
    tag: { name: '', description: '' },
    handleTag: () => {},
};

TagCreateDialog.propTypes = {
    isOpen: PropTypes.bool,
    handleOpen: PropTypes.func,
};

TagCreateDialog.defaultProps = {
    isOpen: false,
    handleOpen: () => {},
};

import React from 'react';
import PropTypes from 'prop-types';
import { useDelTags } from '../hooks';
import { CommonDialog, DialogButton } from '../../../components';

type TagCreateModalType = {
    isOpen: boolean;
    handleOpen: (state: boolean) => void;
    tagId: string | null;
};

export function TagDeleteDialog({ isOpen, handleOpen, tagId }: TagCreateModalType) {
    const { delTag, isLoading } = useDelTags();
    const handeOk = async () => {
        if (tagId) {
            await delTag(tagId);
        }
        handleOpen(false);
    };
    const handleCancel = () => {
        handleOpen(false);
    };
    const title = 'Delete Tag';
    return (
        <CommonDialog
            onClose={handleCancel}
            isOpen={isOpen}
            title={title}
            content={<TagDeleteForm handleCancel={handleCancel} handleOk={handeOk} isLoading={isLoading || !tagId} />}
        />
    );
}

type TagDeleteFormType = {
    handleCancel: () => void;
    handleOk: () => void;
    isLoading: boolean;
};

function TagDeleteForm({ handleCancel, handleOk, isLoading }: TagDeleteFormType) {
    return (
        <div className="w-full max-w-xs">
            <form className="bg-white px-8 pt-6 pb-8 mb-4">
                <div>
                    <DialogButton
                        handleClick={handleOk}
                        text="Ok"
                        className="bg-blue-500 hover:bg-blue-700 text-white"
                        disabled={isLoading}
                    />
                    <DialogButton
                        handleClick={handleCancel}
                        text="Cancel"
                        className="bg-white hover:bg-gray-50 text-gray-900"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </div>
    );
}

TagDeleteForm.propTypes = {
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    isLoading: PropTypes.bool,
};

TagDeleteForm.defaultProps = {
    handleCancel: () => {},
    handleOk: () => {},
    isLoading: false,
};

TagDeleteDialog.propTypes = {
    isOpen: PropTypes.bool,
    handleOpen: PropTypes.func,
};

TagDeleteDialog.defaultProps = {
    isOpen: false,
    handleOpen: () => {},
};

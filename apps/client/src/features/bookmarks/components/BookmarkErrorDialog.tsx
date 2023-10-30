import PropTypes from 'prop-types';
import { CommonDialog, DialogButton, FaceFrownIcon } from '../../../components';
import { Size } from '../../../utils';

type BookmarkErrorDialogProps = {
    isOpen: boolean;
    handleOpen: (state: boolean) => void;
};

export function BookmarkErrorDialog({ isOpen, handleOpen }: BookmarkErrorDialogProps) {
    const message =
        'An error occurred while creating the bookmark. Please try again later or contact support for assistance.';
    const handleOk = () => {
        handleOpen(false);
    };
    return (
        <CommonDialog
            onClose={handleOk}
            isOpen={isOpen}
            title="Error"
            content={<BookmarkErrorForm handleOk={handleOk} message={message} />}
        />
    );
}

BookmarkErrorDialog.propTypes = {
    isOpen: PropTypes.bool,
    handleOpen: PropTypes.func,
};

BookmarkErrorDialog.defaultProps = {
    isOpen: false,
    handleOpen: () => {},
};

type BookmarkErrorFormProps = {
    message: string;
    handleOk: () => void;
};

function BookmarkErrorForm({ message, handleOk }: BookmarkErrorFormProps) {
    return (
        <div className="w-auto bg-white px-8 pt-6 pb-4 mb-4 content-center">
            <FaceFrownIcon size={Size.lg} className="red" />
            <div className="mb-4 align-bottom">{message}</div>
            <div>
                <DialogButton
                    handleClick={handleOk}
                    text="Ok"
                    className="bg-red-500 hover:bg-red-700 text-white mt-6 py-2.5"
                />
            </div>
        </div>
    );
}

BookmarkErrorForm.propTypes = {
    message: PropTypes.string,
    handleOk: PropTypes.func,
};

BookmarkErrorForm.defaultProps = {
    message: '',
    handleOk: () => {},
};

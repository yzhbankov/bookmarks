import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import PropTypes from 'prop-types';
import { CommonDialog } from '../../../components';

type TagCreateModalType = {
    isOpen: boolean;
    handleOpen: (state: boolean) => void;
};

export function TagCreateModal({ isOpen, handleOpen }: TagCreateModalType) {
    const cancelButtonRef = useRef(null);

    return (
        <CommonDialog handleOpen={handleOpen} isOpen={isOpen}>
            <div>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            Triangle
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                Deactivate account
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to deactivate your account? All of your data will be
                                    permanently removed. This action cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => handleOpen(false)}
                    >
                        Deactivate
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => handleOpen(false)}
                        ref={cancelButtonRef}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </CommonDialog>
    );
}

TagCreateModal.propTypes = {
    isOpen: PropTypes.bool,
};

TagCreateModal.defaultProps = {
    isOpen: false,
};

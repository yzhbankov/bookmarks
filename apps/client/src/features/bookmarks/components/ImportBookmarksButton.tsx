import React, { ChangeEvent, RefObject, useRef } from 'react';
import { CommonButton, ImportIcon } from '../../../components';
import { useExportImportBookmarks } from '../hooks';

type ButtonType = {
    isMobile?: boolean;
};

export function ImportBookmarksButton({ isMobile }: ButtonType) {
    const { importFile } = useExportImportBookmarks();
    const fileInputRef: RefObject<any> = useRef(null);

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
    return (
        <>
            <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {!isMobile && (
                <CommonButton
                    className="ml-1 bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500"
                    title={
                        <div className="inline-flex items-center">
                            Import <ImportIcon />
                        </div>
                    }
                    handleClick={() => fileInputRef.current.click()}
                />
            )}
            {isMobile && (
                <div
                    className="text-gray-700 block px-4 py-2 text-sm flex justify-between cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                >
                    Import
                    <ImportIcon />
                </div>
            )}
        </>
    );
}

import React, { ChangeEvent, RefObject, useRef } from 'react';
import { CommonButton } from '../../../components';
import { useExportImportBookmarks } from '../hooks';

export function ImportBookmarksButton() {
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
            <CommonButton
                className="ml-1 bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500"
                title="Import"
                handleClick={() => fileInputRef.current.click()}
            />
        </>
    );
}

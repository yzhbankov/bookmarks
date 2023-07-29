import React from 'react';
import { CommonButton, ExportIcon } from '../../../components';
import { useExportImportBookmarks } from '../hooks';
import { IBookmark } from '../../../models';

type ExportButtonType = {
    bookmarks: IBookmark[];
    isMobile?: boolean;
};

export function ExportBookmarksButton({ bookmarks, isMobile }: ExportButtonType) {
    const { exportFile } = useExportImportBookmarks();

    if (isMobile) {
        return (
            <div
                onClick={() => exportFile(bookmarks)}
                className="text-gray-700 block px-4 py-2 text-sm flex justify-between cursor-pointer"
            >
                Export
                <ExportIcon />
            </div>
        );
    }
    return (
        <CommonButton
            className="bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500"
            title={
                <div className="inline-flex items-center">
                    Export <ExportIcon />
                </div>
            }
            handleClick={() => exportFile(bookmarks)}
        />
    );
}

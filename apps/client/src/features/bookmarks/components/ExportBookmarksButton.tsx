import React from 'react';
import { CommonButton } from '../../../components';
import { useExportImportBookmarks } from '../hooks';
import { IBookmark } from '../../../models';

type ExportButtonType = {
    bookmarks: IBookmark[];
};

export function ExportBookmarksButton({ bookmarks }: ExportButtonType) {
    const { exportFile } = useExportImportBookmarks();
    return (
        <CommonButton
            className="ml-2 mr-1 bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500"
            title="Export"
            handleClick={() => exportFile(bookmarks)}
        />
    );
}

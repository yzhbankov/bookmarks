import React from 'react';
import { IBookmark } from '../../../models';
import { saveJSONToFile } from '../../../utils';

export interface IBookmarkExportImport {
    exportFile: (bookmarks: IBookmark[]) => void;
    importFile: () => void;
}

export function useExportImportBookmarks(): IBookmarkExportImport {
    function exportFile(bookmarks: IBookmark[]) {
        const exportData = bookmarks.map((bookmark: IBookmark) => ({
            title: bookmark.title,
            description: bookmark.description,
            url: bookmark.url,
        }));
        saveJSONToFile({ bookmarks: exportData }, 'bookmarks.json');
    }
    function importFile() {
        alert('Import File');
        return undefined;
    }
    return {
        exportFile,
        importFile,
    };
}

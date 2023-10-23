import React from 'react';
import { IBookmark, IBookmarkCreate } from '../../../models';
import { saveJSONToFile } from '../../../utils';
import { useCreateBookmark } from './useCreateBookmarks';
import { useFetchSpaces } from '../../spaces/hooks';

export interface IBookmarkExportImport {
    exportFile: (bookmarks: IBookmark[]) => void;
    importFile: (data: { bookmarks: IBookmarkCreate[] }) => void;
}

// todo: implement logging
export function useExportImportBookmarks(): IBookmarkExportImport {
    const { addBookmark } = useCreateBookmark();
    const { spaces } = useFetchSpaces();

    function exportFile(bookmarks: IBookmark[]) {
        const nowIso: string = new Date().toISOString();
        const exportData = bookmarks.map((bookmark: IBookmark) => ({
            title: bookmark.title,
            description: bookmark.description,
            url: bookmark.url,
        }));
        saveJSONToFile({ bookmarks: exportData }, `bookmarks_${nowIso}.json`);
    }
    async function importFile(data: { bookmarks: IBookmarkCreate[] }) {
        if (!data.bookmarks || !Array.isArray(data.bookmarks)) alert('Wrong file format');

        for (const bookmark of data.bookmarks) {
            try {
                await addBookmark({ ...bookmark, space: spaces[0] && spaces[0].id });
            } catch (err) {
                console.error('Error adding bookmark: ', err);
            }
        }
    }
    return {
        exportFile,
        importFile,
    };
}

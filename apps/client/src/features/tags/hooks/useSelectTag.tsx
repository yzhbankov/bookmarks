import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context';

const bookmarksTag = 'BOOKMARKS_TAG';

export interface ITagsStorage {
    saveStoreTag: (id: string) => void;
    clearStoreTag: () => void;
    selectedTag: string | null;
}

export function useSelectTag(): ITagsStorage {
    const { appPersistentStorage } = useContext(AppContext);
    const storeTag = appPersistentStorage.read(bookmarksTag);
    const [selectedTag, setSelectedTag] = useState<string | null>(storeTag);

    const saveStoreTag = (tagId: string) => {
        appPersistentStorage.save(bookmarksTag, tagId);
        setSelectedTag(tagId);
    };

    const clearStoreTag = () => {
        appPersistentStorage.remove(bookmarksTag);
        setSelectedTag(null);
    };

    return {
        saveStoreTag,
        clearStoreTag,
        selectedTag,
    };
}

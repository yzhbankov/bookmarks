import { appPersistentStorage, BrowserKeys } from '../../../utils';

export function saveSelectedTag(value: string): void {
    const selected = appPersistentStorage.getItem(BrowserKeys.BookmarksTag);
    if (selected && !selected.includes(value)) {
        appPersistentStorage.setItem(BrowserKeys.BookmarksTag, selected + ';' + value);
    } else if (!selected) {
        appPersistentStorage.setItem(BrowserKeys.BookmarksTag, value);
    }
}

export function getSelectedTags(): string | null {
    return appPersistentStorage.getItem(BrowserKeys.BookmarksTag);
}

export function clearSelectedTag(value: string): void {
    const selected = appPersistentStorage.getItem(BrowserKeys.BookmarksTag);
    if (selected && value && selected.includes(value)) {
        const filtered = selected
            .split(';')
            .filter((storedTag) => storedTag !== value)
            .join(';');
        appPersistentStorage.setItem(BrowserKeys.BookmarksTag, filtered);
    }
}

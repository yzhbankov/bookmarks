import Cookies from 'js-cookie';

export const BrowserKeys = {
    LastPath: 'BOOKMARKS_LAST_PATH',
    Cookie: 'access_token',
    BookmarksTag: 'BOOKMARKS_TAG',
};

export interface IAppPersistentStorage {
    lastRoutePath: string;
    token: string | undefined;
    clear: () => void;
    saveSelectedTag: (value: string) => void;
    getSelectedTag: () => string | null;
    clearSelectedTag: () => void;
}

class AppPersistentStorage implements IAppPersistentStorage {
    private local: Storage;

    constructor(localStorage: Storage) {
        this.local = localStorage;
    }

    set lastRoutePath(lastPath) {
        if (!lastPath) {
            this.local.removeItem(BrowserKeys.LastPath);
        } else {
            this.local.setItem(BrowserKeys.LastPath, lastPath);
        }
    }

    get lastRoutePath(): string {
        return this.local.getItem(BrowserKeys.LastPath) || '';
    }

    get token() {
        return Cookies.get(BrowserKeys.Cookie);
    }

    clear() {
        return Cookies.remove(BrowserKeys.Cookie);
    }

    saveSelectedTag(value: string) {
        this.local.setItem(BrowserKeys.BookmarksTag, value);
    }

    getSelectedTag(): string | null {
        return this.local.getItem(BrowserKeys.BookmarksTag);
    }

    clearSelectedTag(): void {
        this.local.removeItem(BrowserKeys.BookmarksTag);
    }
}

export const appPersistentStorage = new AppPersistentStorage(localStorage);

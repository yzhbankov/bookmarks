import Cookies from 'js-cookie';

export const BrowserKeys = {
    LastPath: 'BOOKMARKS_LAST_PATH',
    Cookie: 'access_token',
    BookmarksTag: 'BOOKMARKS_TAG',
};

export interface IAppPersistentStorage {
    lastRoutePath: string;
    token: string | undefined;
    clearCookie: () => void;
    setItem: (key: string, val: string) => void;
    getItem: (key: string) => string | null;
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

    clearCookie() {
        return Cookies.remove(BrowserKeys.Cookie, { domain: '.bookmarks.ink', path: '/' });
    }

    setItem(key: string, value: string) {
        this.local.setItem(key, value);
    }

    getItem(key: string): string | null {
        return this.local.getItem(key);
    }
}

export const appPersistentStorage = new AppPersistentStorage(localStorage);

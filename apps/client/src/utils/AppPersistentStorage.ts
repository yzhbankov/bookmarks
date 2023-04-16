import Cookies from 'js-cookie';

export const BrowserKeys = {
    LastPath: 'BOOKMARKS_LAST_PATH',
    Cookie: 'access_token',
};

export interface IAppPersistentStorage {
    lastRoutePath: string;
    token: string | undefined;
    clear: () => void;
    save: (key: string, value: string) => void;
    read: (key: string) => string | null;
    remove: (key: string) => void;
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

    save(key: string, value: string) {
        this.local.setItem(key, value);
    }

    read(key: string): string | null {
        return this.local.getItem(key);
    }

    remove(key: string): void {
        this.local.removeItem(key);
    }
}

export const appPersistentStorage = new AppPersistentStorage(localStorage);

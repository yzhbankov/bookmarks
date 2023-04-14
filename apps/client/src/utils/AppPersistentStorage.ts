import Cookies from 'js-cookie';

const BrowserKeys = {
    LastPath: 'BOOKMARKS_LAST_PATH',
    Cookie: 'access_token',
};

export interface IAppPersistentStorage {
    lastRoutePath: string;
    token: string | undefined;
    clear: () => void;
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

    get lastRoutePath() {
        return this.local.getItem(BrowserKeys.LastPath) || '';
    }

    get token() {
        return Cookies.get(BrowserKeys.Cookie);
    }

    clear() {
        return Cookies.remove(BrowserKeys.Cookie);
    }
}

export const appPersistentStorage = new AppPersistentStorage(localStorage);

const BrowserKeys = {
    securityToken: 'BOOKMARKS',
};

export interface IAppPersistentStorage {
    securityToken: string | null;
}

class AppPersistentStorage implements IAppPersistentStorage {
    private local: Storage;

    /**
     * @param {WindowLocalStorage} localStorage - browser local storage
     */
    constructor(localStorage: Storage) {
        this.local = localStorage;
    }

    /**
     * @method Read token in a local storage
     * @return {string|null}
     */
    get securityToken(): string | null {
        return this.local.getItem(BrowserKeys.securityToken);
    }
}

export const appPersistentStorage = new AppPersistentStorage(localStorage);

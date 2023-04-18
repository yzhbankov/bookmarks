import PropTypes from 'prop-types';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { appPersistentStorage } from '../utils';

type ActionType = { type: string; payload?: string | null };
export const TagsContext = createContext<any>(null);
export const TagsDispatchContext = createContext<Dispatch<ActionType>>(() => {});

const bookmarksTag = 'BOOKMARKS_TAG';

type TagsProviderPropType = {
    children: ReactNode;
};

export function TagsProvider({ children }: TagsProviderPropType) {
    const storeTag = appPersistentStorage.read(bookmarksTag);
    const [tag, dispatch] = useReducer<any>(tagsReducer, storeTag);

    return (
        <TagsContext.Provider value={tag}>
            <TagsDispatchContext.Provider value={dispatch}>{children}</TagsDispatchContext.Provider>
        </TagsContext.Provider>
    );
}

function tagsReducer(tag: string | null, action: ActionType) {
    switch (action.type) {
        case 'check': {
            if (action.payload) {
                appPersistentStorage.save(bookmarksTag, action.payload);
            }
            return action.payload;
        }
        case 'clear': {
            appPersistentStorage.remove(bookmarksTag);
            return null;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

TagsProvider.propTypes = {
    children: PropTypes.shape({}),
};

TagsProvider.defaultProps = {
    children: null,
};

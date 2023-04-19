import PropTypes from 'prop-types';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { appPersistentStorage } from '../utils';

type ActionType = { type: string; payload?: string | null };
type TagsProviderPropType = { children: ReactNode };
export const TagsContext = createContext<any>(null);
export const TagsDispatchContext = createContext<Dispatch<ActionType>>(() => {});

export function TagsProvider({ children }: TagsProviderPropType) {
    const storeTag = appPersistentStorage.getSelectedTag();
    const [checkedTag, dispatch] = useReducer<any>(tagsReducer, storeTag);

    return (
        <TagsContext.Provider value={checkedTag}>
            <TagsDispatchContext.Provider value={dispatch}>{children}</TagsDispatchContext.Provider>
        </TagsContext.Provider>
    );
}

function tagsReducer(tag: string | null, action: ActionType) {
    switch (action.type) {
        case 'check': {
            if (action.payload) {
                appPersistentStorage.saveSelectedTag(action.payload);
            }
            return action.payload;
        }
        case 'clear': {
            appPersistentStorage.clearSelectedTag();
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

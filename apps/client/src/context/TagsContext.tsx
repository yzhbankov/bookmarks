import PropTypes from 'prop-types';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { getSelectedTags, saveSelectedTag, clearSelectedTag } from '../features/tags/utils';

type ActionType = { type: string; payload?: string | null };
type TagsProviderPropType = { children: ReactNode };
export const TagsContext = createContext<any>(null);
export const TagsDispatchContext = createContext<Dispatch<ActionType>>(() => {});

export function TagsProvider({ children }: TagsProviderPropType) {
    const [selectedTags, dispatch] = useReducer<any>(tagsReducer, getSelectedTags());

    return (
        <TagsContext.Provider value={selectedTags}>
            <TagsDispatchContext.Provider value={dispatch}>{children}</TagsDispatchContext.Provider>
        </TagsContext.Provider>
    );
}

function tagsReducer(tag: string | null, action: ActionType) {
    switch (action.type) {
        case 'check': {
            if (action.payload) {
                saveSelectedTag(action.payload);
            }
            return getSelectedTags();
        }
        case 'clear': {
            clearSelectedTag(action.payload || '');
            return getSelectedTags();
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

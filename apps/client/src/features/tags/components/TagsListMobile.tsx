import React, { useContext, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronUpIcon, CrossIcon } from '../../../components';
import { ITag } from '../../../models';
import { useDelTags } from '../hooks';
import { useOnClickOutside } from '../../../hooks';
import { Size } from '../../../utils';
import { TagsDispatchContext, TagsContext } from '../../../context';

type TagsListType = {
    tags: ITag[] | undefined;
};

export function TagsListMobile({ tags }: TagsListType) {
    const [opened, setOpenMenu] = useState(false);
    const ref = useRef(null);
    const handleMenuClick = useCallback(() => setOpenMenu(!opened), [opened]);
    const handleMenuClose = useCallback(() => setOpenMenu(false), []);
    useOnClickOutside(ref, handleMenuClose);

    return (
        <>
            <div className="inline-block justify-between text-left" ref={ref}>
                <button
                    type="button"
                    className="inline-flex items-center w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                >
                    <span>Tags</span>
                    <ChevronUpIcon className={opened ? 'rotate-0' : 'rotate-180'} />
                </button>
                <div
                    className={classNames(
                        'absolute mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                        opened ? '' : 'hidden'
                    )}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    {tags && tags.map((tag: ITag) => <TagItem key={tag.id} tag={tag} />)}
                </div>
            </div>
        </>
    );
}

TagsListMobile.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.object),
};

TagsListMobile.defaultProps = {
    tags: [],
};

type TagItemType = {
    tag?: ITag;
};

function TagItem({ tag }: TagItemType) {
    const dispatch = useContext(TagsDispatchContext);
    const selected = useContext(TagsContext);
    const { delTag } = useDelTags();

    if (!tag) return null;
    return (
        <a
            href="#"
            key={tag.id}
            id={tag.id}
            className={classNames(
                'text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100',
                (selected || '').includes(tag.id) ? 'bg-gray-200' : ''
            )}
            role="menuitem"
            title={tag.description}
            tabIndex={-1}
            onClick={() => {
                if ((selected || '').includes(tag.id)) {
                    dispatch({ type: 'clear', payload: tag.id });
                } else {
                    dispatch({ type: 'check', payload: tag.id });
                }
            }}
        >
            <div className="flex justify-between">
                {tag.name}
                <div className="h-6 w-6 flex justify-center items-center rounded-full hover:bg-gray-300">
                    <CrossIcon
                        size={Size.xs}
                        handleClick={async (e) => {
                            e.stopPropagation();
                            await delTag(tag.id);
                            if ((selected || '').includes(tag.id)) {
                                dispatch({ type: 'clear', payload: tag.id });
                            }
                        }}
                    />
                </div>
            </div>
        </a>
    );
}

TagItem.propTypes = {
    tag: PropTypes.object,
};

TagItem.defaultProps = {
    tag: null,
};

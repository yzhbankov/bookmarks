import React, { useCallback, useRef, useState } from 'react';
import { ImportIcon, CommonButton } from '../../../components';
import { ExportBookmarksButton } from './ExportBookmarksButton';
import { ImportBookmarksButton } from './ImportBookmarksButton';
import { IBookmark } from '../../../models';
import { useMediaQuery, useOnClickOutside } from '../../../hooks';
import classNames from 'classnames';

type ButtonsContainerType = {
    handleClickAddButton: () => void;
    bookmarks: IBookmark[];
};

export function ButtonsContainer({ handleClickAddButton, bookmarks }: ButtonsContainerType) {
    const isDesktop = useMediaQuery('(min-width: 1100px)');
    if (isDesktop) {
        return <DesktopButtons handleClickAddButton={handleClickAddButton} bookmarks={bookmarks} />;
    }
    return <MobileButtons handleClickAddButton={handleClickAddButton} bookmarks={bookmarks} />;
}

type ButtonsType = {
    handleClickAddButton: () => void;
    bookmarks: IBookmark[];
};

function DesktopButtons({ handleClickAddButton, bookmarks }: ButtonsType) {
    return (
        <div className="inline-flex">
            <CommonButton
                className="w-[146px] bg-blue-500 hover:bg-blue-700 text-white"
                title="Add bookmark"
                handleClick={handleClickAddButton}
            />
            <div className="ml-1">
                <ExportBookmarksButton bookmarks={bookmarks} />
                <ImportBookmarksButton />
            </div>
        </div>
    );
}

function MobileButtons({ handleClickAddButton, bookmarks }: ButtonsType) {
    const [opened, setOpenMenu] = useState(false);
    const ref = useRef(null);
    const handleMenuClick = useCallback(() => setOpenMenu(!opened), [opened]);
    const handleMenuClose = useCallback(() => setOpenMenu(false), []);
    useOnClickOutside(ref, handleMenuClose);

    return (
        <div className="inline-block justify-between text-left" ref={ref}>
            <button
                type="button"
                className="inline-flex justify-center items-center w-[146px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={handleMenuClick}
            >
                <span>Bookmarks</span>
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
                <div className="text-gray-700 block px-4 py-2 text-sm cursor-pointer">
                    <div onClick={handleClickAddButton} className="text-gray-700 block px-4 py-2 text-sm">
                        Add
                    </div>
                    <ExportBookmarksButton bookmarks={bookmarks} isMobile={true} />
                    <ImportBookmarksButton isMobile={true} />
                </div>
            </div>
        </div>
    );
}

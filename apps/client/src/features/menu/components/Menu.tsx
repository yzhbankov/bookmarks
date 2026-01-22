import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAuth } from '../../auth/hooks';
import { useOnClickOutside } from '../../../hooks';

export function Menu() {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    <Title />
                    <UserButton />
                </div>
            </div>
        </nav>
    );
}

Menu.propTypes = {};

Menu.defaultProps = {};

export function Title() {
    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Bookmarks</span>
        </div>
    );
}

Title.propTypes = {};

Title.defaultProps = {};

export function UserButton() {
    const [isOpenMenu, setOpenMenu] = useState<boolean>(false);
    const { user, logout } = useAuth();
    const ref = useRef(null);
    const toggleMenu = useCallback(() => setOpenMenu(!isOpenMenu), [isOpenMenu]);
    const closeMenu = useCallback(() => setOpenMenu(false), []);

    useOnClickOutside(ref, closeMenu);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                className="flex items-center gap-2 sm:gap-3 py-1.5 px-2 sm:px-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={toggleMenu}
            >
                <span className="sr-only">Open user menu</span>
                <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <img className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-gray-200" src={user.picture} alt="" />
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div
                className={classNames(
                    'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden transition-all duration-150',
                    isOpenMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                )}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
            >
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="py-1">
                    <button
                        type="button"
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        onClick={() => logout()}
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
}

UserButton.propTypes = {};

UserButton.defaultProps = {};

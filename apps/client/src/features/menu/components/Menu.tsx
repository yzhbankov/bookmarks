import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAuth } from '../../auth/hooks';
import { useOnClickOutside } from '../../../hooks';

export function Menu() {
    return (
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 sticky top-0 z-50">
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
        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30 group-hover:scale-105">
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
                className="flex items-center gap-2 sm:gap-3 py-1.5 px-2 sm:px-3 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group"
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
                <img className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-gray-200 group-hover:ring-blue-200 transition-all" src={user.picture} alt="" />
                <svg className={classNames(
                    "w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-200",
                    isOpenMenu && "rotate-180"
                )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div
                className={classNames(
                    'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 focus:outline-none overflow-hidden transition-all duration-200',
                    isOpenMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                )}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
            >
                <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100/50">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="p-1.5">
                    <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3 transition-colors group/btn"
                        onClick={() => logout()}
                    >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover/btn:bg-rose-100 flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 text-gray-500 group-hover/btn:text-rose-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <span className="group-hover/btn:text-gray-900 transition-colors">Sign out</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

UserButton.propTypes = {};

UserButton.defaultProps = {};

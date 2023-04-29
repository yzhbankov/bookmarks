import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAuth } from '../../auth/hooks';
import { useOnClickOutside } from '../../../hooks';

export function Menu() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between p-4">
                <div className="text-center md:order-1 w-10 h-8" />
                <div className="text-center md:order-2">
                    <Title />
                </div>
                <div className="relative inline-block text-left md:order-3 w-10">
                    <UserButton />
                </div>
            </div>
        </nav>
    );
}

Menu.propTypes = {};

Menu.defaultProps = {};

export function Title() {
    return <div className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bookmarks</div>;
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
        <div ref={ref}>
            <div>
                <button
                    type="button"
                    className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src={user.picture} alt="user photo" />
                </button>
            </div>

            <div
                className={classNames(
                    'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none grid grid-cols-1 divide-y',
                    isOpenMenu ? '' : 'hidden'
                )}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
            >
                <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900">{user.name}</span>
                    <span className="block text-sm  text-gray-500 truncate">{user.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => logout()}
                        >
                            Sign out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

UserButton.propTypes = {};

UserButton.defaultProps = {};

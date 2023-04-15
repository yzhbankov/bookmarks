import React from 'react';
import { UserButton } from './UserButton';
import { Title } from './Title';

export function Menu() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between p-4">
                <div className="flex text-left md:order-2">
                    <Title />
                </div>
                <div className="relative inline-block text-left md:order-3">
                    <UserButton />
                </div>
            </div>
        </nav>
    );
}

Menu.propTypes = {};

Menu.defaultProps = {};

import React from 'react';
import { useAuth } from '../../auth/hooks';

export function Menu() {
    const { user, logout } = useAuth();
    console.log(user);
    return (
        <div>
            <div className="text-center">Bookmarks menu</div>
            <img src={user && user.picture} />
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
}

Menu.propTypes = {};

Menu.defaultProps = {};

import React from 'react';

export function Footer() {
    return (
        <div className="text-center">
            Designed by{' '}
            <a className="text-blue-700" href="https://github.com/yzhbankov/bookmarks">
                @yzhbankov
            </a>
        </div>
    );
}

Footer.propTypes = {};

Footer.defaultProps = {};

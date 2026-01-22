import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

type LayoutPropsType = {
    menuRender: () => ReactNode;
    contentRender: () => ReactNode;
    footerRender: () => ReactNode;
};

export function Layout(props: LayoutPropsType) {
    const { menuRender, contentRender, footerRender } = props;
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
                {menuRender()}
            </header>
            <main className="flex-1">
                {contentRender()}
            </main>
            <footer className="py-4 text-center text-gray-500 text-sm border-t border-gray-100 bg-white">
                {footerRender()}
            </footer>
        </div>
    );
}

Layout.propTypes = {
    menuRender: PropTypes.func,
    contentRender: PropTypes.func,
    footerRender: PropTypes.func,
};

Layout.defaultProps = {
    menuRender: () => {},
    contentRender: () => {},
    footerRender: () => {},
};

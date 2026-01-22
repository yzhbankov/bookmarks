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
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
            <header>
                {menuRender()}
            </header>
            <main className="flex-1">
                {contentRender()}
            </main>
            <footer className="py-4 text-center text-gray-400 text-sm border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
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

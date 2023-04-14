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
        <div className="h-screen w-screen">
            <div>{menuRender()}</div>
            <div>{contentRender()}</div>
            <div className="fixed bottom-0 text-center w-screen">{footerRender()}</div>
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

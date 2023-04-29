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
        <>
            <div className="min-h-[calc(100vh-30px)] w-screen">
                <div className="sticky top-0">{menuRender()}</div>
                <div>{contentRender()}</div>
            </div>
            <div className="text-center">{footerRender()}</div>
        </>
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

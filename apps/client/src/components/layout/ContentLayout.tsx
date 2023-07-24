import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

type ContentLayoutType = {
    tagsRender: () => ReactNode;
    bookmarksRender: () => ReactNode;
};

export function ContentLayout(props: ContentLayoutType) {
    const { tagsRender, bookmarksRender } = props;
    return (
        <>
            <div className="ml-52 mr-52">
                <div>{tagsRender()}</div>
                <div>{bookmarksRender()}</div>
            </div>
        </>
    );
}

ContentLayout.propTypes = {
    tagsRender: PropTypes.func,
    bookmarksRender: PropTypes.func,
};

ContentLayout.defaultProps = {
    tagsRender: () => {},
    bookmarksRender: () => {},
};

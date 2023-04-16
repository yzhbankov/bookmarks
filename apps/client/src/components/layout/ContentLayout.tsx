import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

type ContentLayoutType = {
    tagsRender: () => ReactNode;
    bookmarksRender: () => ReactNode;
};

export function ContentLayout(props: ContentLayoutType) {
    const { tagsRender, bookmarksRender } = props;
    return (
        <div className="flex flex-row">
            <div className="basis-1/5" />
            <div className="basis-3/5">
                <div>{tagsRender()}</div>
                <div>{bookmarksRender()}</div>
            </div>
            <div className="basis-1/5" />
        </div>
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

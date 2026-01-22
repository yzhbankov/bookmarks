import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

type ContentLayoutType = {
    categoriesRender: () => ReactNode;
    bookmarksRender: () => ReactNode;
};

export function ContentLayout(props: ContentLayoutType) {
    const { categoriesRender, bookmarksRender } = props;
    return (
        <div className="min-h-[calc(100vh-130px)] p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4">
                {/* Category Filters */}
                <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4">
                    {categoriesRender()}
                </div>

                {/* Main Content - Bookmarks */}
                <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
                    {bookmarksRender()}
                </div>
            </div>
        </div>
    );
}

ContentLayout.propTypes = {
    categoriesRender: PropTypes.func,
    bookmarksRender: PropTypes.func,
};

ContentLayout.defaultProps = {
    categoriesRender: () => {},
    bookmarksRender: () => {},
};

import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

type ContentLayoutType = {
    categoriesRender: () => ReactNode;
    bookmarksRender: () => ReactNode;
};

export function ContentLayout(props: ContentLayoutType) {
    const { categoriesRender, bookmarksRender } = props;
    return (
        <div className="min-h-[calc(100vh-130px)] p-2 sm:p-4 lg:p-6 bg-gradient-to-b from-gray-50 to-gray-100/50">
            <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4">
                {/* Category Filters */}
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 p-3 sm:p-4 shadow-sm animate-fade-in-down">
                    {categoriesRender()}
                </div>

                {/* Main Content - Bookmarks */}
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm animate-fade-in-up">
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

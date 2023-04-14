import React from 'react';
import PropTypes from 'prop-types';
import { IBookmarksFetch, useFetchBookmarks } from '../hooks';

export function Bookmarks() {
    const bookmarksFetch: IBookmarksFetch = useFetchBookmarks();
    return (
        <div>
            <div className="text-center">Bookmarks components</div>
            <div>Bookmarks:</div>
            <div>Fetch: {bookmarksFetch.isFetching}</div>
            <div>Error: {bookmarksFetch.isError}</div>
            <div>List: {JSON.stringify(bookmarksFetch.data)}</div>
        </div>
    );
}

Bookmarks.propTypes = {};

Bookmarks.defaultProps = {};

import React from 'react';
import { useFetchBookmarks, IBookmarksFetch } from '../features/bookmarks/hooks';

export function App() {
    const bookmarksFetch: IBookmarksFetch = useFetchBookmarks();
    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <div>Bookmarks:</div>
            <div>Fetch: {bookmarksFetch.isFetching}</div>
            <div>Error: {bookmarksFetch.isError}</div>
            <div>List: {JSON.stringify(bookmarksFetch.data)}</div>
        </div>
    );
}

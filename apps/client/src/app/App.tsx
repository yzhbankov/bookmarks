import React from 'react';
import { useFetchBookmarks, IBookmarksFetch } from '../features/bookmarks/hooks';
import { useFetchTags, ITagsFetch } from '../features/tags/hooks';
import { useFetchSpaces, ISpacesFetch } from '../features/spaces/hooks';

export function App() {
    const bookmarksFetch: IBookmarksFetch = useFetchBookmarks();
    const tagsFetch: ITagsFetch = useFetchTags();
    const spacesFetch: ISpacesFetch = useFetchSpaces();
    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <div>Bookmarks:</div>
            <div>Fetch: {bookmarksFetch.isFetching}</div>
            <div>Error: {bookmarksFetch.isError}</div>
            <div>List: {JSON.stringify(bookmarksFetch.data)}</div>
            <div>Tags:</div>
            <div>Fetch: {tagsFetch.isFetching}</div>
            <div>Error: {tagsFetch.isError}</div>
            <div>List: {JSON.stringify(tagsFetch.data)}</div>
            <div>Spaces:</div>
            <div>Fetch: {spacesFetch.isFetching}</div>
            <div>Error: {spacesFetch.isError}</div>
            <div>List: {JSON.stringify(spacesFetch.data)}</div>
        </div>
    );
}

import React from 'react';
import PropTypes from 'prop-types';
import { ITagsFetch, useFetchTags } from '../hooks';

export function Tags() {
    const tagsFetch: ITagsFetch = useFetchTags();
    return (
        <div>
            <div className="text-center">Tags components</div>
            <div>Tags:</div>
            <div>Fetch: {tagsFetch.isFetching}</div>
            <div>Error: {tagsFetch.isError}</div>
            <div>List: {JSON.stringify(tagsFetch.data)}</div>
        </div>
    );
}

Tags.propTypes = {};

Tags.defaultProps = {};

import React from 'react';
import PropTypes from 'prop-types';

enum SortDirection {
    ASC,
    DESC,
    NONE,
}

type SpinnerIconType = {
    sortDirection: SortDirection;
};

export function SortArrowIcon({ sortDirection }: SpinnerIconType) {
    switch (sortDirection) {
        case SortDirection.ASC:
            return <AscSortIcon />;
        case SortDirection.DESC:
            return <DescSortIcon />;
        default:
            return null;
    }
}

SortArrowIcon.propTypes = { sortDirection: PropTypes.string };

SortArrowIcon.defaultProps = { sortDirection: SortDirection.ASC };

function AscSortIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
        </svg>
    );
}

function DescSortIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
        </svg>
    );
}

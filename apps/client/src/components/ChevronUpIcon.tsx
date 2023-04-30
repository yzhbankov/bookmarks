import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Size } from '../utils';

type ChevronUpIconPropsType = {
    className: string;
    size?: Size;
};

function getSizeClass(size?: string) {
    switch (size) {
        case Size.xs:
            return 'w-3 h-3';
        case Size.sm:
            return 'w-4 h-4';
        case Size.md:
            return 'w-6 h-6';
        case Size.lg:
            return 'w-8 h-8';
        default:
            return 'w-4 h-4';
    }
}

export function ChevronUpIcon({ className, size }: ChevronUpIconPropsType) {
    const classSize = getSizeClass(size);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classNames(classSize, className || '')}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    );
}

ChevronUpIcon.defaultProps = {
    className: '',
    size: '',
};
ChevronUpIcon.propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
};

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Size } from '../utils';

type ChevronUpIconPropsType = {
    size?: Size;
    className?: string;
    handleClick?: (e: any) => void;
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

export function CrossIcon({ size, className, handleClick }: ChevronUpIconPropsType) {
    const sizeClass = getSizeClass(size);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={classNames(sizeClass, className)}
            onClick={handleClick}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

CrossIcon.propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    handleClick: PropTypes.func,
};
CrossIcon.defaultProps = {
    className: '',
    size: '',
    handleClick: () => {},
};

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Size } from '../utils';

type FaceFrownIconPropsType = {
    className: string;
    size?: Size;
};

function getSizeClass(size?: string) {
    switch (size) {
        case Size.xs:
            return 'w-3 h-3';
        case Size.sm:
            return 'w-6 h-6';
        case Size.md:
            return 'w-10 h-10';
        case Size.lg:
            return 'w-12 h-12';
        default:
            return 'w-4 h-4';
    }
}

export function FaceFrownIcon({ className, size }: FaceFrownIconPropsType) {
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
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
        </svg>
    );
}

FaceFrownIcon.defaultProps = {
    className: '',
    size: '',
};
FaceFrownIcon.propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
};

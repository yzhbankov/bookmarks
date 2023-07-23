import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Size, getSizeClass } from '../utils';

type BtnProps = {
    handleClick: () => void;
    size?: Size;
    left?: boolean;
    right?: boolean;
    up?: boolean;
    down?: boolean;
    className?: string;
};

export function ChevronBtn({ size, className, handleClick, left, right, up, down }: BtnProps) {
    const sizeClass: string = getSizeClass(size);

    if (left) {
        return (
            <button className={classNames('rounded-full py-2 px-2', className)} onClick={handleClick}>
                <ChevronLeftIcon className={sizeClass} />
            </button>
        );
    } else if (right) {
        return (
            <button className={classNames('rounded-full py-2 px-2', className)} onClick={handleClick}>
                <ChevronRightIcon className={sizeClass} />
            </button>
        );
    } else if (up) {
        return (
            <button className={classNames('rounded-full py-2 px-2', className)} onClick={handleClick}>
                <ChevronUpIcon className={sizeClass} />
            </button>
        );
    } else if (down) {
        return (
            <button className={classNames('rounded-full py-2 px-2', className)} onClick={handleClick}>
                <ChevronDownIcon className={sizeClass} />
            </button>
        );
    }
    return null;
}

type IconProps = {
    className: string;
};

function ChevronLeftIcon({ className }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    );
}

function ChevronRightIcon({ className }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    );
}

function ChevronUpIcon({ className }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    );
}

function ChevronDownIcon({ className }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

ChevronLeftIcon.propTypes = {
    className: PropTypes.string,
};

ChevronLeftIcon.defaultProps = {
    className: 'w-6 h-6',
};

ChevronRightIcon.propTypes = {
    className: PropTypes.string,
};

ChevronRightIcon.defaultProps = {
    className: 'w-6 h-6',
};

ChevronUpIcon.propTypes = {
    className: PropTypes.string,
};

ChevronUpIcon.defaultProps = {
    className: 'w-6 h-6',
};

ChevronDownIcon.propTypes = {
    className: PropTypes.string,
};

ChevronDownIcon.defaultProps = {
    className: 'w-6 h-6',
};

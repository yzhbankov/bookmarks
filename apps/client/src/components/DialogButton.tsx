import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

type ButtonType = {
    handleClick: () => void;
    className: string;
    text: string;
    disabled: boolean;
};

export function DialogButton({ handleClick, className, text, disabled }: ButtonType) {
    return (
        <button
            type="button"
            className={classNames(
                'inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto',
                className,
                disabled ? 'disabled:opacity-50' : ''
            )}
            onClick={handleClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

DialogButton.propTypes = {
    handleClick: PropTypes.func,
    className: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool,
};

DialogButton.defaultProps = {
    handleClick: () => {},
    className: '',
    text: '',
    disabled: false,
};

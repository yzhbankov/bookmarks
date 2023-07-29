import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

type CommonButtonType = {
    className?: string;
    title: ReactNode | string;
    handleClick: () => void;
};

export function CommonButton({ handleClick, title, className }: CommonButtonType) {
    return (
        <button className={classNames('font-bold py-1.5 px-3 rounded', className)} onClick={() => handleClick()}>
            {title}
        </button>
    );
}

CommonButton.propTypes = {
    handleClick: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string,
};

CommonButton.defaultProps = {
    handleClick: () => {},
    title: '',
    className: '',
};

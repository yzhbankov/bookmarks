import React from 'react';
import PropTypes from 'prop-types';

type CommonButtonType = {
    title: string;
    handleClick: () => void;
};

export function CommonButton({ handleClick, title }: CommonButtonType) {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleClick()}
        >
            {title}
        </button>
    );
}

CommonButton.propTypes = {
    handleClick: PropTypes.func,
    title: PropTypes.string,
};

CommonButton.defaultProps = {
    handleClick: () => {},
    title: '',
};

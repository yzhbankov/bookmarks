import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { CrossIcon, SpinnerIcon } from '../../../components';
import { Color, Size } from '../../../utils';

type TagButton = {
    id: string;
    name: string;
    title: string;
    checked: boolean;
    isLoading: boolean;
    handleCheck: (id: string) => void;
    handleDelete: (id: string) => void;
};

export function TagButton({ id, name, title, handleCheck, handleDelete, checked, isLoading }: TagButton) {
    return (
        <div className="inline-flex mr-1" title={title}>
            <button
                className={className(
                    'flex justify-between border border-gray-300 font-bold pl-2 pr-2 py-1.5 rounded h-[36px]',
                    checked ? 'bg-gray-100 hover:bg-gray-50 text-gray-500 ' : 'bg-white hover:bg-gray-100 text-gray-500'
                )}
                onClick={() => handleCheck(id)}
            >
                {name}
                <div
                    className="h-6 w-6 ml-2 flex justify-center items-center rounded-full hover:bg-blue-400"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(id);
                    }}
                >
                    {isLoading ? <SpinnerIcon size={Size.xs} color={Color.blue} /> : <CrossIcon size={Size.xs} />}
                </div>
            </button>
        </div>
    );
}

TagButton.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    handleDelete: PropTypes.func,
    handleCheck: PropTypes.func,
    checked: PropTypes.bool,
    isLoading: PropTypes.bool,
};

TagButton.defaultProps = {
    id: '',
    name: '',
    title: '',
    handleDelete: () => {},
    handleCheck: () => {},
    checked: false,
    isLoading: false,
};

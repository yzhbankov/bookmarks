import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';

type SearchType = { handleChange: (val: string) => void };

export function Search({ handleChange }: SearchType) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return (
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    handleChange(e.target.value.toLowerCase());
                }, 300);
            }}
        />
    );
}

Search.propTypes = {
    handleChange: PropTypes.func,
};

Search.defaultProps = {
    handleChange: () => {},
};

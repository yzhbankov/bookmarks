import React, { ChangeEvent, RefObject, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

type SearchType = { handleChange: (val: string) => void };

export function Search({ handleChange }: SearchType) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const inputRef: RefObject<any> = useRef(null);
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key) {
                inputRef.current.focus();
            }
        };
        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);
    return (
        <input
            className="shadow appearance-none border rounded w-full py-2 h-[36px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Search"
            ref={inputRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    handleChange(e.target.value.toLowerCase());
                }, 300);
            }}
            autoFocus={true}
        />
    );
}

Search.propTypes = {
    handleChange: PropTypes.func,
};

Search.defaultProps = {
    handleChange: () => {},
};

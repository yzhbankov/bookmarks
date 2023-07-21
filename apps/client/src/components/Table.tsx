import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SortArrowIcon } from '../components';
import { useSortTable, SortDirection } from '../hooks';

type RowType = { [key: string]: any };

export type ColumnType = {
    key: string;
    header: string;
    renderCell?: (rowData?: RowType, cell?: any, width?: string) => ReactNode;
    className?: string;
};

type TablePropsType = {
    data: RowType[];
    columns: ColumnType[];
    className?: string;
    rowClassName?: string;
};

export function Table({ data, columns, className, rowClassName }: TablePropsType) {
    const { sortedData, handleSort, sortBy, sortDirection } = useSortTable(data);
    return (
        <table className={classNames(className)}>
            <Header columns={columns} handleClick={handleSort} sortBy={sortBy} sortDirection={sortDirection} />
            <tbody>
                {sortedData.map((rowData, index) => (
                    <tr key={index} className={rowClassName}>
                        {columns.map((column) => (
                            <Column key={column.key} rowData={rowData} column={column} />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.object),
};
Table.defaultProps = {
    data: [],
    className: '',
    columns: [],
};

type HeaderPropType = {
    columns: {
        key: string;
        header: string;
        className?: string;
    }[];
    handleClick: (key: string) => void;
    sortBy: string;
    sortDirection: SortDirection;
};

function Header({ columns, handleClick, sortBy, sortDirection }: HeaderPropType) {
    return (
        <thead>
            <tr>
                {columns.map((column) => (
                    <th
                        className={classNames(column.className, 'cursor-pointer')}
                        key={column.key}
                        onClick={() => handleClick(column.key)}
                    >
                        <span className="inline-flex">
                            {column.header}
                            {sortBy === column.key && <SortArrowIcon sortDirection={sortDirection} />}
                        </span>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

Header.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
};
Header.defaultProps = {
    columns: [],
};

type ColumnPropsType = {
    rowData: { [key: string]: any };
    column: ColumnType;
};
function Column({ rowData, column }: ColumnPropsType) {
    const className = classNames(column.className);
    if (column.renderCell) {
        return <td className={className}>{column.renderCell(rowData, rowData[column.key])}</td>;
    }
    return <td className={className}>{rowData[column.key]}</td>;
}

Column.propTypes = {
    rowData: PropTypes.object,
    column: PropTypes.object,
};
Column.defaultProps = {
    rowData: {},
    column: {},
};

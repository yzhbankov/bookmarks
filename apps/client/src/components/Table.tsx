import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

type RowType = { [key: string]: any };

export type ColumnType = {
    key: string;
    header: string;
    renderCell?: (rowData?: RowType, cell?: any) => ReactNode;
};

type TablePropsType = {
    data: RowType[];
    columns: ColumnType[];
};

export function Table({ data, columns }: TablePropsType) {
    return (
        <table className="table-auto">
            <Header columns={columns} />
            <tbody>
                {data.map((rowData, index) => (
                    <tr key={index}>
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
    columns: PropTypes.arrayOf(PropTypes.object),
};
Table.defaultProps = {
    data: [],
    columns: [],
};

type HeaderPropType = {
    columns: {
        key: string;
        header: string;
    }[];
};

function Header({ columns }: HeaderPropType) {
    return (
        <thead>
            <tr>
                {columns.map((column) => (
                    <th key={column.key}>{column.header}</th>
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
    if (column.renderCell) {
        return <td>{column.renderCell(rowData, rowData[column.key])}</td>;
    }
    return <td>{rowData[column.key]}</td>;
}

Column.propTypes = {
    rowData: PropTypes.object,
    column: PropTypes.object,
};
Column.defaultProps = {
    rowData: {},
    column: {},
};

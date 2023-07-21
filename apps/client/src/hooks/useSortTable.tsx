import { useState } from 'react';

export enum SortDirection {
    ASC,
    DESC,
    NONE,
}

function sort(data: any[], sortBy: string, sortDirection: SortDirection): any[] {
    const sortedData = [...data];
    if (sortDirection === SortDirection.NONE) return sortedData;

    sortedData.sort((a: any, b: any) => {
        if ((a[sortBy] || '') < (b[sortBy] || '')) {
            return sortDirection === SortDirection.ASC ? 1 : -1;
        } else if ((a[sortBy] || '') > (b[sortBy] || '')) {
            return sortDirection === SortDirection.ASC ? -1 : 1;
        } else {
            return 0;
        }
    });
    return sortedData;
}

export interface ISortTable {
    sortedData: { [key: string]: any[] }[];
    handleSort: (key: string) => void;
    sortBy: string;
    sortDirection: SortDirection;
}

export function useSortTable(data: { [key: string]: any[] }[]): ISortTable {
    const [sortDirection, setDirection] = useState(SortDirection.NONE);
    const [sortBy, setSortBy] = useState('');

    function handleSort(key: string) {
        if (sortDirection === SortDirection.ASC) {
            setDirection(SortDirection.DESC);
        } else if (sortDirection === SortDirection.DESC) {
            setDirection(SortDirection.NONE);
        } else {
            setDirection(SortDirection.ASC);
        }
        setSortBy(key);
    }

    const sortedData = sort(data, sortBy, sortDirection);

    return { sortedData, handleSort, sortBy, sortDirection };
}

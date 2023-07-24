import React, { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { useUpdateBookmark, useDelBookmark } from '../hooks';
import { Table, ColumnType, TrashIcon, SpinnerIcon } from '../../../components';
import { Size } from '../../../utils';
import { IBookmark, ITag } from '../../../models';
import { useFetchTags } from '../../tags/hooks';

type BookmarksTableType = {
    bookmarks: IBookmark[];
};

export function BookmarksTable({ bookmarks }: BookmarksTableType) {
    const { tags } = useFetchTags();
    const { updateBookmark } = useUpdateBookmark();

    const columns: ColumnType[] = [
        {
            key: 'title',
            header: 'Title',
            className: 'w-auto',
            renderCell: (row: any, cell: string) => (
                <div title={cell} className="w-48">
                    <a href={row.url} target="_blank" className="flex">
                        <div className="flex mr-2 justify-center items-center">
                            <img src={`https://www.google.com/s2/favicons?domain=${row.url}`} />
                        </div>
                        <div className="truncate w-max-xs">{cell}</div>
                    </a>
                </div>
            ),
        },
        {
            key: 'description',
            header: 'Description',
            className: 'w-auto truncate hidden lg:table-cell',
            renderCell: (row: any, cell: string) => (
                <div title={cell} className="w-72 truncate cursor-default">
                    {cell}
                </div>
            ),
        },
        {
            key: 'tagName',
            className: 'w-24',
            header: 'Tag',
            renderCell: (row: any) => (
                <div className="w-32">
                    <TagSelect
                        handleChange={(e: ChangeEvent<any>) => updateBookmark({ ...row, tag: e.target.value })}
                        tags={tags}
                        tagId={row.tag}
                    />
                </div>
            ),
        },
        {
            key: 'action',
            header: '',
            renderCell: (row: any) => (
                <div>
                    <BookmarksDelButton id={row.id} />
                </div>
            ),
        },
    ];
    return <Table data={bookmarks} columns={columns} className="w-full" rowClassName="hover:bg-gray-100" />;
}

BookmarksTable.propTypes = {
    searchText: PropTypes.string,
};

BookmarksTable.defaultProps = {
    searchText: '',
};

type TagSelectPropType = {
    handleChange: (e: ChangeEvent) => void;
    tags: ITag[];
    tagId: string;
};

function TagSelect({ handleChange, tags = [], tagId }: TagSelectPropType) {
    return (
        <select
            id="tags"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e)}
            value={tagId || ''}
        >
            <option value="">-</option>
            {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                    {tag.name}
                </option>
            ))}
        </select>
    );
}

TagSelect.propTypes = {
    handleChange: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.object),
    tagId: PropTypes.string,
};

TagSelect.defaultProps = {
    handleChange: () => {},
    tags: [],
    tagId: '',
};

type BookmarksDelButtonType = {
    id: string;
};

function BookmarksDelButton({ id }: BookmarksDelButtonType) {
    const { delBookmark, isLoading } = useDelBookmark();
    const [clicked, setClicked] = useState('');
    return (
        <div
            className="cursor-pointer flex justify-center"
            onClick={() => {
                setClicked(id);
                delBookmark(id);
            }}
        >
            {isLoading && clicked === id ? <SpinnerIcon size={Size.xs} /> : <TrashIcon />}
        </div>
    );
}

BookmarksDelButton.propTypes = {
    id: PropTypes.string,
};

BookmarksDelButton.defaultProps = {
    id: '',
};

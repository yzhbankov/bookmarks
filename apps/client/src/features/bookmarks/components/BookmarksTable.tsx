import React, { ChangeEvent, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFetchBookmarks, useUpdateBookmark, useDelBookmark } from '../hooks';
import { Table, ColumnType, TrashIcon, SpinnerIcon, SpinnerSize } from '../../../components';
import { IBookmarkTable, ITag } from '../../../models';
import { useFetchTags } from '../../tags/hooks';
import { TagsContext } from '../../../context';

// todo: bookmark icons
// todo: bookmark titles
// todo: bookmark links click
// todo: multiple tag selecting

function getSearched(data: IBookmarkTable[], searchText: string): IBookmarkTable[] {
    if (!searchText) return data;
    return data
        ? data.reduce((memo: IBookmarkTable[], bookmark: IBookmarkTable) => {
              const includesInUrl: boolean = bookmark.url.toLowerCase().includes(searchText);
              const includesInDescription: boolean = bookmark.description.toLowerCase().includes(searchText);

              if (includesInUrl || includesInDescription) {
                  memo.push(bookmark);
              }
              return memo;
          }, [])
        : [];
}

type BookmarksTableType = {
    searchText: string;
};

export function BookmarksTable({ searchText }: BookmarksTableType) {
    const { getFiltered } = useFetchBookmarks();
    const { delBookmark, isLoading } = useDelBookmark();
    const selected = useContext(TagsContext);
    const { tags } = useFetchTags();
    const { updateBookmark } = useUpdateBookmark();

    const filteredBookmarks = getFiltered(selected);
    const searchedBookmarks = getSearched(filteredBookmarks, searchText);

    const columns: ColumnType[] = [
        { key: 'url', header: 'URL', className: 'w-1/2' },
        { key: 'description', header: 'Description', className: 'hidden md:table-cell' },
        {
            key: 'tagName',
            className: 'w-1/5 hidden sm:table-cell',
            header: 'Tag',
            renderCell: (row: any) => (
                <TagSelect
                    handleChange={(e: ChangeEvent<any>) => updateBookmark({ ...row, tag: e.target.value })}
                    tags={tags}
                    tagId={row.tag}
                />
            ),
        },
        {
            key: 'action',
            className: 'w-1/6',
            header: '',
            renderCell: (row: any) => (
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        delBookmark(row.id);
                    }}
                >
                    {isLoading ? <SpinnerIcon size={SpinnerSize.xs} /> : <TrashIcon />}
                </div>
            ),
        },
    ];
    return <Table data={searchedBookmarks} columns={columns} className="w-full" />;
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
            className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

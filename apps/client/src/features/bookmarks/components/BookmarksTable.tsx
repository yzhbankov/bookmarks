import React, { ChangeEvent, useContext } from 'react';
import { useFetchBookmarks, useUpdateBookmark } from '../hooks';
import { Table, ColumnType } from '../../../components';
import { ITag } from '../../../models';
import { useFetchTags } from '../../tags/hooks';
import { TagsContext } from '../../../context';

export function BookmarksTable() {
    const { getFiltered } = useFetchBookmarks();
    const selected = useContext(TagsContext);
    const { tags } = useFetchTags();
    const { updateBookmark } = useUpdateBookmark();

    const columns: ColumnType[] = [
        { key: 'url', header: 'URL' },
        { key: 'description', header: 'Description' },
        {
            key: 'tagName',
            header: 'Tag',
            renderCell: (row: any) => (
                <TagSelect
                    handleChange={(e: ChangeEvent<any>) => updateBookmark({ ...row, tag: e.target.value })}
                    tags={tags}
                    tagId={row.tag}
                />
            ),
        },
    ];
    return <Table data={getFiltered(selected)} columns={columns} />;
}

BookmarksTable.propTypes = {};

BookmarksTable.defaultProps = {};

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
            defaultValue={tagId}
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

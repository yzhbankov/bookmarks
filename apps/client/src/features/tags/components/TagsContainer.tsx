import React, { useEffect, useRef, useState } from 'react';
import { TagsList } from './TagsList';
import { TagsListMobile } from './TagsListMobile';
import { ChevronBtn } from '../../../components';
import { ITagsFetch, useFetchTags } from '../hooks';
import { useMediaQuery } from '../../../hooks';
import { Size } from '../../../utils';

export function TagsContainer() {
    const { tags }: ITagsFetch = useFetchTags();
    const isDesktop = useMediaQuery('(min-width: 800px)');
    const [isScrollable, setIsScrollable] = useState(false);
    const tagsListRef = useRef(null);

    useEffect(() => {
        const container: any = tagsListRef.current;
        if (!container) return;
        setIsScrollable(container.scrollWidth > container.clientWidth);
    }, [tags]);

    const handleScrollLeft = () => {
        const container: any = tagsListRef.current;
        if (!container) return;
        container.scrollLeft -= container.clientWidth;
    };

    const handleScrollRight = () => {
        const container: any = tagsListRef.current;
        if (!container) return;
        container.scrollLeft += container.clientWidth;
    };

    return (
        <div className="relative">
            {!isDesktop && <TagsListMobile tags={tags} />}
            {isDesktop && <TagsList tags={tags} tagsListRef={tagsListRef} />}
            {isDesktop && isScrollable && (
                <div>
                    <div className="absolute top-0 -left-7 py-1">
                        <ChevronBtn
                            size={Size.xs}
                            handleClick={handleScrollLeft}
                            left={true}
                            className="bg-gray-200 hover:bg-gray-300 active:bg-gray-100"
                        />
                    </div>
                    <div className="absolute top-0 -right-7 py-1">
                        <ChevronBtn
                            size={Size.xs}
                            handleClick={handleScrollRight}
                            right={true}
                            className="bg-gray-200 hover:bg-gray-300 active:bg-gray-100"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

TagsContainer.propTypes = {};
TagsContainer.defaultProps = {};

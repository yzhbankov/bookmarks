import React from 'react';
import { Layout, ContentLayout } from '../components/layout';
import { Tags } from '../features/tags/components';
import { Bookmarks } from '../features/bookmarks/components';
import { Menu } from '../features/menu/components';
import { Footer } from '../features/footer/components';
import { TagsProvider } from '../context';
import { UserResponseButton } from '../features/menu/components';

export function App() {
    return (
        <div className="App">
            <TagsProvider>
                <Layout
                    menuRender={() => <Menu />}
                    contentRender={() => (
                        <ContentLayout categoriesRender={() => <Tags />} bookmarksRender={() => <Bookmarks />} />
                    )}
                    footerRender={() => <Footer />}
                />
            </TagsProvider>
            <UserResponseButton />
        </div>
    );
}

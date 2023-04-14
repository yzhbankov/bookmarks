import React from 'react';
import { Layout, ContentLayout } from '../components/layout';
import { Tags } from '../features/tags/components';
import { Bookmarks } from '../features/bookmarks/components';
import { Menu } from '../features/menu/components';
import { Footer } from '../features/footer/components';

export function App() {
    return (
        <div className="App">
            <Layout
                menuRender={() => <Menu />}
                contentRender={() => (
                    <ContentLayout tagsRender={() => <Tags />} bookmarksRender={() => <Bookmarks />} />
                )}
                footerRender={() => <Footer />}
            />
        </div>
    );
}

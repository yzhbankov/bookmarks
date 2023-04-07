import { Connection } from 'mongoose';
import { BookmarksSchema } from '../shemas/bookmarks.schema';

export const bookmarksProviders = [
    {
        provide: 'BOOKMARK_MODEL',
        useFactory: (connection: Connection) => connection.model('Bookmark', BookmarksSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];

import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://bookmarks:bookmarks@127.0.0.1:27017/bookmarks',
      ),
  },
];

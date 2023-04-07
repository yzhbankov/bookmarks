import { Connection } from 'mongoose';
import { TagSchema } from './shemas/tag.schema';

export const tagsProviders = [
  {
    provide: 'TAG_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Tag', TagSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

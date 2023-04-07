import { Connection } from 'mongoose';
import { SpaceSchema } from './shemas/space.schema';

export const spacesProviders = [
  {
    provide: 'SPACE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Space', SpaceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

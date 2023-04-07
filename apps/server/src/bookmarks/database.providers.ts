import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (configService: ConfigService): Promise<typeof mongoose> => {
      const dbUser = configService.get<string>('database.user');
      const dbPassword = configService.get<string>('database.password');
      const dbHost = configService.get<string>('database.host');
      const dbPort = configService.get<string>('database.port');
      const dbSchema = configService.get<string>('database.schema');
      return mongoose.connect(
        `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbSchema}`,
      );
    },
    inject: [ConfigService],
  },
];

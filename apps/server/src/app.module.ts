import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration],
    }),
    BookmarksModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const dbUser = configService.get<string>('database.user');
        const dbPassword = configService.get<string>('database.password');
        const dbHost = configService.get<string>('database.host');
        const dbPort = configService.get<string>('database.port');
        const dbSchema = configService.get<string>('database.schema');
        return {
          uri: `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbSchema}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

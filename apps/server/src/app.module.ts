import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import configuration from '../config/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    ignoreEnvFile: true,
    isGlobal: true,
    load: [configuration],
  }), BookmarksModule],
  controllers: [],
  providers: [AppService]
})
export class AppModule {}

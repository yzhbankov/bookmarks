import { ConfigModule } from '@nestjs/config';
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
    MongooseModule.forRoot(
      'mongodb://bookmarks:bookmarks@127.0.0.1:27017/bookmarks',
    ),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

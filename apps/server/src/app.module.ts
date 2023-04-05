import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    ignoreEnvFile: true,
    isGlobal: true,
    load: [configuration],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

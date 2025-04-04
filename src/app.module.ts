import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AnimeModule } from './modules/anime/anime.module';
import { HttpModule } from './modules/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
    }),
    AnimeModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

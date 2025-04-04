import { Module } from '@nestjs/common';

import { AnimeController } from './controllers/anime.controller';
import { AnimeService } from './services/anime.service';
import { HttpModule } from '../http/http.module';

@Module({
  controllers: [AnimeController],
  imports: [HttpModule],
  providers: [AnimeService],
  exports: [AnimeService],
})
export class AnimeModule {}

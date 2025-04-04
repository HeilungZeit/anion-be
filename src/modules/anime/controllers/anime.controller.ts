import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import {
  AnimeDetails,
  AnimeFeedResponse,
  GenresResponse,
} from '../interfaces/anime.interface';
import { AnimeService } from '../services/anime.service';
import { AnimeQueryDto } from '../dto/anime-query.dto';
import { SearchQueryDto } from '../dto/search-query.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get('/')
  async getAnime(@Query() query: AnimeQueryDto): Promise<AnimeDetails[]> {
    return this.animeService.getAnimesByQuery(query);
  }

  @Get('/feed')
  getFeed(): Promise<AnimeFeedResponse> {
    return this.animeService.getAnimeFeed();
  }

  @Get('/genres')
  async getGenres(): Promise<GenresResponse> {
    return this.animeService.getGenres();
  }

  @Post('/search')
  async searchAnime(@Body() body: SearchQueryDto): Promise<AnimeDetails[]> {
    return this.animeService.searchAnime(body);
  }

  @Get('/:id')
  async getAnimeById(@Param('id') id: string): Promise<AnimeDetails> {
    return this.animeService.getAnimeById(id);
  }

  @Get('/:id/recommendations')
  async getSimilarAnimes(@Param('id') id: string): Promise<AnimeDetails[]> {
    return this.animeService.getSimilarAnimes(id);
  }
}

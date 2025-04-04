import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { client } from 'node-shikimori/dist/index.cjs';

import {
  addHttps,
  transformToCamelCase,
  transformToSnakeCase,
} from '../../../utils/transformers';
import { HttpYumiService } from '../../http/http-yumi.service';
import {
  AnimeDetails,
  AnimeFeedResponse,
  AnimeQuery,
  GenresResponse,
} from '../interfaces/anime.interface';
import { AnimeQueryDto } from '../dto/anime-query.dto';
import { SearchQueryDto } from '../dto/search-query.dto';

@Injectable()
export class AnimeService {
  private cache = new Map();
  private shikimori: ReturnType<typeof client>;
  private httpClient: AxiosInstance;

  constructor(private readonly httpService: HttpYumiService) {
    this.shikimori = client();
    this.httpClient = this.httpService.getHttpClient();
  }

  async getAnimeFeed(): Promise<AnimeFeedResponse> {
    const cacheKey = 'animeFeed';

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await this.httpClient.get('/feed');
      const { top_carousel, schedule, new: updates } = response.data.response;
      const seasonAnimeIds: number[] = top_carousel.items.map(
        (item) => item.anime_id,
      );

      const {
        data: { response: animeDetails },
      } = await this.httpClient.get('/anime', {
        params: {
          ids: seasonAnimeIds,
          limit: 30,
        },
      });

      const shikiIds: number[] = animeDetails.map(
        (item) => item.remote_ids.shikimori_id,
      );

      const shikiDetails = await this.shikimori.animes.list({
        ids: shikiIds.join(','),
        limit: 30,
      });

      const seasonAnime = animeDetails.map((item) => {
        const shikiDetail = shikiDetails.find(
          (detail) => detail.id === item.remote_ids.shikimori_id,
        );

        return {
          ...item,
          episodes: {
            count: shikiDetail?.episodes || 0,
            aired: shikiDetail?.episodes_aired || 0,
          },
        };
      });

      const data = {
        seasonAnime,
        schedule,
        updates,
      };

      const transformedData: AnimeFeedResponse = transformToCamelCase(data);
      setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);

      this.cache.set(cacheKey, transformedData);
      return transformedData;
    } catch (error) {
      throw new HttpException(
        'Ошибка при получении фида аниме',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async getAnimesByQuery(query: AnimeQueryDto): Promise<AnimeDetails[]> {
    try {
      const transformedQuery = transformToSnakeCase<AnimeQuery>(query);

      const response = await this.httpClient.get('/anime', {
        params: {
          ...transformedQuery,
        },
      });
      console.log(response.data.response.length);
      return transformToCamelCase(response.data.response);
    } catch (error) {
      throw new Error(`Ошибка при поиске аниме: ${query}`);
    }
  }

  async getAnimeById(id: string): Promise<AnimeDetails> {
    try {
      const response = await this.httpClient.get(
        `/anime/${id}?need_videos=true`,
      );
      const { response: data } = response.data;

      const animeDetails: AnimeDetails = transformToCamelCase(data);
      const transformedData: AnimeDetails = {
        ...animeDetails,
        poster: addHttps(animeDetails.poster),
        videos: animeDetails.videos.map((item) => ({
          ...item,
          iframeUrl: addHttps(item.iframeUrl),
        })),
      };

      return transformedData;
    } catch (error) {
      throw new Error(`Ошибка при получении аниме с ID: ${id}`);
    }
  }

  async getSimilarAnimes(id: string): Promise<AnimeDetails[]> {
    try {
      const response = await this.httpService
        .getHttpClient()
        .get(`/anime/${id}/recommendations?offset=0&limit=20`);
      const { response: data } = response.data;
      console.log(data);
      return transformToCamelCase(data);
    } catch (error) {
      throw new Error(`Ошибка при получении схожих аниме: ${id}`);
    }
  }

  async getGenres(): Promise<GenresResponse> {
    const cacheKey = 'animeGenres';

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await this.httpClient.get('/anime/genres');

      return transformToCamelCase(response.data.response);
    } catch (error) {
      throw new Error('Ошибка при получении жанров');
    }
  }

  async searchAnime(payload: SearchQueryDto): Promise<AnimeDetails[]> {
    const queryPayload = {
      q: payload.search,
      offset: payload.offset,
      limit: payload.limit,
    };

    try {
      const response = await this.httpClient.get('/search', {
        params: queryPayload,
      });

      return transformToCamelCase(response.data.response);
    } catch (error) {
      throw new Error(
        `Ошибка при поиске аниме: ${JSON.stringify(queryPayload)}; ${error.message}`,
      );
    }
  }
}

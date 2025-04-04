import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';

enum Season {
  WINTER = 'winter',
  SPRING = 'spring',
  SUMMER = 'summer',
  FALL = 'fall',
  AUTUMN = 'autumn',
}

enum Status {
  ONGOING = 'ongoing',
  RELEASED = 'released',
  ANNOUNCE = 'announce',
  ANNOUNCEMENT = 'announcement',
}

enum Translates {
  FULL = 'full',
  DUBBING = 'dubbing',
  MULTIVOICE = 'multivoice',
  ONEVOICE = 'onevoice',
  SINGLE = 'single',
  TWOVOICE = 'twovoice',
  DUET = 'duet',
  SUBTITLES = 'subtitles',
}

enum Types {
  TV = 'tv',
  MOVIE = 'movie',
  SHORTFILM = 'shortfilm',
  OVA = 'ova',
  SPECIAL = 'special',
  SHORTTV = 'shorttv',
  ONA = 'ona',
}

enum Sort {
  TITLE = 'title',
  YEAR = 'year',
  RATING = 'rating',
  RATING_COUNTERS = 'rating_counters',
  VIEWS = 'views',
  TOP = 'top',
  RANDOM = 'random',
  ID = 'id',
}

enum RequiredFields {
  CREATORS = 'creators',
  STUDIOS = 'studios',
  ORIGINAL = 'original',
  DESCRIPTION = 'description',
  MIN_AGE = 'min_age',
  SEASON = 'season',
  GENRES = 'genres',
  EP_COUNT = 'ep_count',
  TRANSLATES = 'translates',
}

export class AnimeQueryDto {
  @IsOptional()
  @IsNumber()
  minAge?: number;

  @IsOptional()
  @IsNumber()
  maxRatingCounters?: number;

  @IsOptional()
  @IsNumber()
  minRatingAverage?: number;

  @IsOptional()
  @IsEnum(RequiredFields, { each: true })
  requireFields?: RequiredFields[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(',').map(Number))
  ids?: number[];

  @IsOptional()
  @IsEnum(Season, { each: true })
  @Transform(({ value }) => value.split(','))
  season?: Season[];

  @IsOptional()
  @IsEnum(Status, { each: true })
  @Transform(({ value }) => value.split(','))
  status?: Status[];

  @IsOptional()
  @IsEnum(Translates, { each: true })
  @Transform(({ value }) => value.split(','))
  translates?: Translates[];

  @IsOptional()
  @IsEnum(Types, { each: true })
  @Transform(({ value }) => value.split(','))
  types?: Types[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  excludeGenres?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  genres?: string[];

  @IsOptional()
  @IsNumber()
  maxRating?: number;

  @IsOptional()
  @IsNumber()
  minRating?: number;

  @IsOptional()
  @IsNumber()
  epTo?: number;

  @IsOptional()
  @IsNumber()
  epFrom?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  toYear?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  fromYear?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  sortForward?: boolean;

  @IsOptional()
  @IsEnum(Sort)
  sort?: Sort;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  offset: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit: number;
}

type BasicAnimeType = {
  description?: string;
  poster: {
    fullsize: string;
    big: string;
    small: string;
    medium: string;
    huge: string;
  };
  title: string;
  animeUrl: string;
  animeId: number;
  rating?: {
    average?: number;
    counters?: number;
  };
  episodes?: {
    aired?: number;
    nextDate?: number;
    count?: number;
  };
};

type SeasonAnimeType = {
  season: number;
  year: number;
  items: BasicAnimeType[];
};

type Gener = {
  title: string;
  url: string;
  id: number;
  alias: string;
};

type Studio = {
  url: string;
  title: string;
  id: number;
};

type Creator = {
  url: string;
  title: string;
  id: number;
};

type Translate = {
  value: number;
  title: string;
  href: string;
};

type Video = {
  videoId: number;
  data: {
    player: string;
    dubbing: string;
  };
  number: string;
  date: number;
  iframeUrl: string;
  index: number;
  skips: {
    opening?: string | number | null;
    ending?: string | number | null;
  };
};

type RemoteIds = {
  worldartId: number;
  shikimoriId: number;
  anidubId: number;
  anilibriaAlias: string;
  myanimelistId: number;
  kpId: number;
  worldartType: string;
  srId: number;
};

type AnimeType = {
  name: string;
  value: number;
  shortname: string;
};

type AnimeStatus = {
  value: number;
  title: string;
  alias: string;
  class: string;
};

type Screenshots = {
  time: number;
  id: number;
  episode: string;
  sizes: {
    small: string;
    full: string;
  };
};
export interface AnimeFeedResponse {
  seasonAnime: SeasonAnimeType;
  schedule: BasicAnimeType[];
  new: BasicAnimeType[];
}

export interface AnimeDetails {
  description: string;
  poster: {
    fullsize: string;
    big: string;
    small: string;
    medium: string;
    huge: string;
  };
  title: string;
  animeUrl: string;
  animeId: number;
  status: number;
  rating: {
    average: number;
    counters: number;
    kpRating: number;
    shikimoriRating: number;
    anidubRating: number;
    myanimelistRating: number;
    worldartRating: number;
  };
  year: number;
  minAge: {
    value: number;
    titleLong: string;
    title: string;
  };
  views: number;
  season: number;
  animeStatus: AnimeStatus;
  type: AnimeType;
  otherTitles: string[];
  remoteIds: RemoteIds;
  translates: Translate[];
  creators: Creator[];
  studios: Studio[];
  genres: Gener[];
  original: string;
  viewingOrder: string[];
  blockedIn: string[];
  episodes: {
    count: number;
    aired: number;
    nextDate: number;
  };
  commentsCount: number;
  reviewsCount: number;
  videos: Video[];
  randomScreenshots: Screenshots[];
}

type RequiredFileds =
  | 'creators'
  | 'studios'
  | 'original'
  | 'description'
  | 'min_age'
  | 'season'
  | 'genres'
  | 'ep_count'
  | 'translates';

type Season = 'winter' | 'spring' | 'summer' | 'fall' | 'autumn';
type Status = 'ongoing' | 'released' | 'announce' | 'announcement';
type Translates =
  | 'full'
  | 'dubbing'
  | 'multivoice'
  | 'onevoice'
  | 'single'
  | 'twovoice'
  | 'duet'
  | 'subtitles';
type Types =
  | 'tv'
  | 'movie'
  | 'shortfilm'
  | 'ova'
  | 'special'
  | 'shorttv'
  | 'ona';
type Sort =
  | 'title'
  | 'year'
  | 'rating'
  | 'rating_counters'
  | 'views'
  | 'top'
  | 'random'
  | 'id';

export interface AnimeQuery {
  minAge?: number;
  maxRatingCounters?: number;
  minRatingAverage?: number;
  requireFields?: RequiredFileds;
  ids?: number[];
  season?: Season[];
  status?: Status[];
  translates?: Translates[];
  types?: Types[];
  excludeGenres?: string[];
  genres?: string[];
  maxRating?: number;
  minRating?: number;
  epTo?: number;
  epFrom?: number;
  toYear?: number;
  fromYear?: number;
  sortForward?: boolean;
  sort?: Sort;
  offset: number;
  limit: number;
}

interface GenreGroup {
  title: string;
  id: number;
}

interface GenreResponse {
  title: string;
  href: string;
  value: number;
  more_titles: string[];
  group_id: number;
}

export interface GenresResponse {
  genres: GenreResponse[];
  groups: GenreGroup[];
}

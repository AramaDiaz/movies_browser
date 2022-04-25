export interface InputInterface {
  input: string;
  type: string;
  placeholder: string;
  id: string;
  meta: { touched: boolean; error: string };
}

export type resp = {
  page?: number;
  results: Movie[];
  total_pages?: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TvShow = {
  backdrop_path: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export interface SpinnerProps {
  loaded: boolean;
}

export interface MovieItemProps {
  path: string;
  entry: Movie;
  pageNo: number;
}

export interface TvItemProps {
  path: string;
  entry: TvShow;
  pageNo: number;
}

export interface PaginationProps {
  pageNo: number;
  total_pages: number;
}

export type Details = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Production_company[];
  production_countries: [{ iso_3166_1: string; name: string }];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [{ english_name: string; iso_639_1: string; name: string }];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TvShowDetails = {
  adult: boolean;
  backdrop_path: string;
  created_by: [
    {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string;
    }
  ];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: [
    {
      air_date: string;
      episode_number: number;
      id: number;
      name: string;
      overview: string;
      production_code: string;
      season_number: number;
      still_path: string;
      vote_average: number;
      vote_count: number;
    }
  ];
  name: string;
  networks: [
    { name: string; id: number; logo_path: string; origin_country: string }
  ];
  next_episode_to_air: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Production_company[];
  production_countries: [{ iso_3166_1: string; name: string }];
  seasons: Season[];
  spoken_languages: [{ english_name: string; iso_639_1: string; name: string }];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

type Production_company = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

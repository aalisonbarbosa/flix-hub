export interface MediaItemBase {
  id: number;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  genre_ids: number[];
}

export interface Movie extends MediaItemBase {
  title: string;
  release_date: string;
}

export interface Series extends MediaItemBase {
  name: string;
  first_air_date: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  gender: 0 | 1 | 2 | 3; // 0: não especificado, 1: feminino, 2: masculino, 3: não-binário
}

export interface PersonCredits {
  id: number;
  cast: FilmographyItem[];
}

export interface FilmographyItem {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  character: string;
  poster_path: string | null;
}
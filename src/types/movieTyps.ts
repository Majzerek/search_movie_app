export type MovieType = {
  title:string;
  adult:boolean;
  id: number;
  genre_ids: number[];
  orginal_language: string;
  orginal_title: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  video: boolean;
};

export type ChangePageType = {
  total: number;
};

export type BestMoviesType = {
  setBest: (value: boolean) => void;
  best: boolean;
}
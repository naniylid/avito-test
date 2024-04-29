export type Movies = {
  id: number;
  movieId: number;
  name: string;
  alternativeName?: string;
  year: number;
  genres?: {
    name: string;
  }[];
  countries: {
    name: string;
  }[];
  description?: string;
  rating?: {
    kp: number;
  };
  ageRating?: number;
  poster: {
    url: string;
  };
  persons: {
    name: string;
    profession?: string;
    id?: number;
  }[];
  similarMovies?: {
    id: number;
    poster: {
      previewUrl: string;
    };
  }[];
};

export type MovieResponse = {
  docs: Movies[];
};

export type Review = {
  movieId: number;
  author: string;
  title: string;
  review: string;
};

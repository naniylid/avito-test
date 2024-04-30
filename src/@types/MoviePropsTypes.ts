export type Movies = {
  id: string;
  movieId: string;
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
    id: string;
    poster: {
      previewUrl: string;
    };
  }[];
};

export type MovieResponse = {
  docs: Movies[];
};

export type Review = {
  movieId: string;
  author: string;
  title: string;
  review: string;
};

import { Review } from '../../@types/MoviePropsTypes';

export type FilmStates = {
  reviews: Review[];
  currentPage: number;
  slidesToShow: number;
};

export interface RecommendedMoviesProps {
  similarMovies: {
    id: string;
    poster: {
      previewUrl: string;
    };
  }[];
  onMovieClick: (id: string) => void;
}

export interface ReviewsProps {
  movieId: string | undefined;
}

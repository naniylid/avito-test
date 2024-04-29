import { Review } from '../../@types/MoviePropsTypes';

export type FilmStates = {
  reviews: Review[];
  currentPage: number;
  slidesToShow: number;
};

export interface RecommendedMoviesProps {
  similarMovies: {
    id: number;
    poster: {
      previewUrl: string;
    };
  }[];
  onMovieClick: (id: number) => void;
}

export interface ReviewsProps {
  movieId: string | undefined;
}

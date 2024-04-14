import React from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';

interface RecommendedMoviesProps {
  similarMovies: {
    id: number;
    poster: {
      previewUrl: string;
    };
  }[];
  onMovieClick: (id: number) => void;
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({ similarMovies, onMovieClick }) => {
  return (
    <Carousel slidesToShow={5} dots>
      {similarMovies.map((movie) => (
        <div key={movie.id} onClick={() => onMovieClick(movie.id)}>
          <img
            src={movie.poster.previewUrl}
            alt='Фильм'
            style={{ width: '100%', height: '400px', objectFit: 'cover', cursor: 'pointer' }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default RecommendedMovies;

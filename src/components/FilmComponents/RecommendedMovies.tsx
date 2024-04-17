import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';

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
  const [slidesToShow, setSlidesToShow] = useState<number>(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesToShow(5);
      } else if (window.innerWidth >= 992) {
        setSlidesToShow(4);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 576) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    // Вызываем handleResize при загрузке страницы и при изменении размера окна
    handleResize();
    window.addEventListener('resize', handleResize);

    // Очищаем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {similarMovies && similarMovies.length > 0 ? (
        <Carousel slidesToShow={slidesToShow} dots>
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
      ) : (
        <p>Нет информации</p>
      )}
    </>
  );
};

export default RecommendedMovies;

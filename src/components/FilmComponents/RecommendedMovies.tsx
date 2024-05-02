import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RecommendedMoviesProps } from './types';
import { setSlidesToShow, selectFilmComponentsSlice } from './filmSlice';

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({ similarMovies, onMovieClick }) => {
  const dispatch = useDispatch();
  const { slidesToShow } = useSelector(selectFilmComponentsSlice);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        dispatch(setSlidesToShow(5));
      } else if (window.innerWidth >= 992) {
        dispatch(setSlidesToShow(4));
      } else if (window.innerWidth >= 768) {
        dispatch(setSlidesToShow(3));
      } else if (window.innerWidth >= 576) {
        dispatch(setSlidesToShow(2));
      } else {
        dispatch(setSlidesToShow(1));
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
                alt={`Фильм ${movie.id}`}
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

import React from 'react';
import { Button, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import defaultposter from '../../assets/image/default.svg';
import './RandomMovie.module.scss';
import { selectRandomSlice, setItem } from './randomSlice';
import { fetchMovieById } from '../fetchMovie';

const RandomFilm: React.FC = () => {
  const dispatch = useDispatch();
  const { item } = useSelector(selectRandomSlice);

  const min = 666;
  const max = 2000;

  const id = '' + (Math.floor(Math.random() * (max - min + 1)) + min);

  const getRandomMovie = async () => {
    const newId = '' + (Math.floor(Math.random() * (max - min + 1)) + min);
    try {
      const data = await fetchMovieById(newId);
      dispatch(setItem(data));
    } catch (error) {
      console.error('Ошибка при получении нового фильма:', error);
    }
  };

  React.useEffect(() => {
    async function fetchRandomMovie() {
      try {
        const data = await fetchMovieById(id);
        dispatch(setItem(data));
      } catch (error) {
        console.error('Ошибка при получении фильма:', error);
      }
    }

    fetchRandomMovie();
  }, []);

  if (!item) {
    return <>Загрузка...</>;
  }

  //Получение стран
  const formatCountries = (countries: { name: string }[]): string => {
    return countries.map((country) => country.name).join(', ');
  };

  //Получание жанров
  const getFirstTwoGenres = (genres: { name: string }[]): string => {
    if (genres.length >= 2) {
      return `${genres[0].name}, ${genres[1].name}`;
    } else if (genres.length === 1) {
      return genres[0].name;
    } else {
      return '';
    }
  };

  // Обработка пустых фото
  const posterUrl =
    item.poster && item.poster.url && item.poster.url !== 'null' ? item.poster.url : defaultposter;

  return (
    <div className='random-movie'>
      <h1>Выбрать случайный фильм </h1>
      <Link to={`/movie/${item.id}`}>
        <Card
          className='random-movie__card'
          hoverable
          style={{ width: 250 }}
          cover={<img alt='film' src={posterUrl} />}
        >
          <Meta title={item.name ? item.name : item.alternativeName} description='' />
          <div>
            <p>
              {formatCountries(item.countries)} •{' '}
              {item.genres ? getFirstTwoGenres(item.genres) : ''}
            </p>
            <p>Год: {item.year}</p>
            <p>Возрастной рейтинг: {item.ageRating ? item.ageRating : 'Нет'}</p>
          </div>
        </Card>
      </Link>
      <Button onClick={getRandomMovie}>Получить фильм</Button>
    </div>
  );
};

export default RandomFilm;

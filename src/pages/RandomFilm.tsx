import React from 'react';
import { Button, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Movies } from '../@types/types';
import defaultposter from '../assets/image/default.svg';
import '../assets/styles/pages/RandomMovie.module.scss';

const API_KEY: string = import.meta.env.VITE_API_KEY as string;

const RandomFilm: React.FC = () => {
  const [item, setItem] = React.useState<Movies>();
  const min = 666;
  const max = 2000;

  const id = Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomMovie = async () => {
    const newId = Math.floor(Math.random() * (max - min + 1)) + min;
    try {
      const { data } = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/${newId}`, {
        headers: {
          accept: 'application/json',
          'X-API-KEY': API_KEY,
        },
      });
      setItem(data);
    } catch (error) {
      console.error('Ошибка при получении нового фильма:', error);
    }
  };

  React.useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
          headers: {
            accept: 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        setItem(data);
      } catch (error) {
        console.error('Ошибка при получении фильма:', error);
      }
    }

    fetchMovie();
  }, []);

  if (!item) {
    return <>Загрузка...</>;
  }

  const formatCountries = (countries: { name: string }[]): string => {
    return countries.map((country) => country.name).join(', ');
  };

  const getFirstTwoGenres = (genres: { name: string }[]): string => {
    if (genres.length >= 2) {
      return `${genres[0].name}, ${genres[1].name}`;
    } else if (genres.length === 1) {
      return genres[0].name;
    } else {
      return '';
    }
  };

  return (
    <div className='random-movie'>
      <h1>Выбрать случайный фильм </h1>
      <Link to={`/movie/${item.id}`}>
        <Card
          className='random-movie__card'
          hoverable
          style={{ width: 250 }}
          cover={
            <img
              alt='film'
              src={
                item.poster && item.poster.url && item.poster.url !== 'null'
                  ? item.poster.url
                  : defaultposter
              }
            />
          }
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

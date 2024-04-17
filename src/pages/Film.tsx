import React from 'react';
import { Image, Rate, Descriptions, Flex, Button } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../assets/styles/Film.module.scss';
import { Reviews, RecommendedMovies } from '../components';
import { Movies } from '../@types/types';
import defaultposter from '../assets/image/default.svg';

import { apiKey } from '../core/redux/slices/apiSlice';

const Film: React.FC = () => {
  const [item, setItem] = React.useState<Movies>();

  const formatCountries = (countries: { name: string }[]): string => {
    return countries.map((country) => country.name).join(', ');
  };

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchMovie() {
      try {
        const { data } = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
          headers: {
            accept: 'application/json',
            'X-API-KEY': apiKey,
          },
        });
        setItem(data);
      } catch (error) {
        console.error('Ошибка при получении фильма:', error);
        navigate('/');
      }
    }

    fetchMovie();
  }, []);

  const handleMovieClick = async (id: number) => {
    try {
      const { data } = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
        headers: {
          accept: 'application/json',
          'X-API-KEY': apiKey,
        },
      });
      setItem(data);
    } catch (error) {
      console.error('Ошибка при загрузке деталей фильма:', error);
    }
  };

  if (!item) {
    return <>Загрузка...</>;
  }

  const filteredActors = item.persons.filter((actor) => actor.profession === 'актеры');
  const actorNames = filteredActors.map((actor) => actor.name).join(', ');

  return (
    <>
      <div className={styles.root}>
        <div className={styles.aboutMovie}>
          <Image src={item.poster.url ? item.poster.url : defaultposter} />

          <Descriptions title={item.name}>
            <Descriptions.Item label='Страна'>{formatCountries(item.countries)}</Descriptions.Item>
            <Descriptions.Item label='Актеры'>{actorNames}</Descriptions.Item>

            <Descriptions.Item label='Возраст'>
              {item.ageRating ? item.ageRating : 'Нет'}
            </Descriptions.Item>
            <Descriptions.Item label='Описание'>
              {item.description ? item.description : 'Нет описания'}
            </Descriptions.Item>
          </Descriptions>
        </div>

        <Rate allowHalf defaultValue={item.rating?.kp} />

        {item.similarMovies && (
          <div className='recommendations'>
            <h2>Похожие фильмы</h2>
            <RecommendedMovies similarMovies={item.similarMovies} onMovieClick={handleMovieClick} />
          </div>
        )}
        <div className={styles.reviews}>
          <h2>Отзывы</h2>
          <Reviews movieId={id} />
        </div>

        <Link to='/'>
          <Flex gap='small' wrap='wrap'>
            <Button>Назад</Button>
          </Flex>
        </Link>
      </div>
    </>
  );
};
export default Film;

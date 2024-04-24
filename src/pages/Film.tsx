import React from 'react';
import { Image, Rate, Descriptions, Flex, Button } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../assets/styles/pages/Film.module.scss';
import { Reviews, RecommendedMovies } from '../components';
import { Movies } from '../@types/types';
import defaultposter from '../assets/image/default.svg';
import ReactPaginate from 'react-paginate';

const API_KEY: string = import.meta.env.VITE_API_KEY as string;

const Film: React.FC = () => {
  const [item, setItem] = React.useState<Movies>();
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 10;

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
            'X-API-KEY': API_KEY,
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
          'X-API-KEY': API_KEY,
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

  //Выбираем только актеров
  const filteredActors = item.persons.filter((actor) => actor.profession === 'актеры');
  const actorNames = filteredActors.map((actor) => actor.name).join(', ');

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };
  //Для пагинации, если актеров > 10
  const offset = currentPage * itemsPerPage;
  const currentActors = filteredActors.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.aboutMovie}>
          <Image src={item.poster.url ? item.poster.url : defaultposter} />

          <Descriptions title={item.name}>
            <Descriptions.Item label='Страна'>{formatCountries(item.countries)}</Descriptions.Item>

            <Descriptions.Item label='Актеры'>
              {filteredActors.length < 11 ? (
                actorNames
              ) : (
                <div>
                  <div>
                    {currentActors.map((actor, index) => (
                      <span key={index}>
                        {actor.name}
                        {index < currentActors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={Math.ceil(filteredActors.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    className={styles.pagination}
                    activeClassName={'active'}
                  />
                </div>
              )}
            </Descriptions.Item>

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

import React from 'react';
import { Col, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Movies } from '../../@types/MoviePropsTypes';
import defaultposter from '../../assets/image/default.svg';

const CardItem: React.FC<Movies> = ({
  year,
  name,
  alternativeName,
  genres,
  poster,
  ageRating,
  countries,
}) => {
  const formatCountries = (countries: { name: string }[] | undefined): string => {
    if (!countries) {
      return ''; // Если countries === undefined, возвращаем пустую строку или другое значение по умолчанию
    }

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
    <Col className='gutter-row' span={6}>
      <Card
        hoverable
        cover={
          <img
            alt='film'
            src={poster && poster.url && poster.url !== 'null' ? poster.url : defaultposter}
          />
        }
      >
        <Meta title={name ? name : alternativeName} description='' />
        <div>
          <p>
            {formatCountries(countries)} • {genres ? getFirstTwoGenres(genres) : ''}
          </p>
          <p>Год: {year}</p>
          <p>Возрастной рейтинг: {ageRating ? ageRating : 'Нет'}</p>
        </div>
      </Card>
    </Col>
  );
};

export default CardItem;

import React from 'react';
import { Col, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Movies } from '../../@types/types';

const CardItem: React.FC<Movies> = ({ id, year, name, genres, poster, ageRating, countries }) => {
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
    <Col className='gutter-row' span={6}>
      <Card hoverable style={{ width: 240 }} cover={<img alt='film' src={poster.url} />}>
        <Meta title={name} description='' />
        <div>
          <p>
            {formatCountries(countries)} • {getFirstTwoGenres(genres)}
          </p>
          <p>Год: {year}</p>
          <p>Возрастной рейтинг: {ageRating}+</p>
        </div>
      </Card>
    </Col>
  );
};

export default CardItem;

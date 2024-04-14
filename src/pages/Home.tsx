import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../core/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Row, Col } from 'antd';
import qs from 'qs';
import '../assets/styles/Home.module.scss';
import { SearchFilm, Filter, CustomPagination, Skeleton } from '../components';

import { sortList } from '../components/Filter';

import { fetchMovies, selectApiSlice } from '../core/redux/slices/apiSlice';
import { selectFilterSlice, setPage, setFilters } from '../core/redux/slices/filterSlice';

import CardItem from '../components/Card/Card';
import { SearchParams } from '../@types/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { sort, page, searchValue } = useSelector(selectFilterSlice);
  const { items, status } = useSelector(selectApiSlice);

  const sortType = sort.sortProperty;

  const onChangePage = (value: number) => {
    dispatch(setPage(value));
  };

  const getMovies = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? '↓' : '↑';
    const search = searchValue;

    dispatch(
      //Бизнес логика получения пицц
      fetchMovies({
        page: String(page),
        sortBy,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          page: Number(params.page),
          sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // //Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,

        page,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortType, searchValue, page]);

  // //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getMovies();
    }
    isSearch.current = false;
  }, [sortType, searchValue, page]);

  const movies = items.map((obj) => (
    <Link to={`/movie/${obj.id}`}>
      <CardItem {...obj} key={obj.id} />
    </Link>
  ));
  const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='main-block'>
      <SearchFilm />
      <Divider orientation='center'>
        Все фильмы и сериалы
        <div className='filter'>
          <Filter value={sort} />
        </div>
      </Divider>

      <Row gutter={[16, 24]}>
        {status === 'error' ? (
          <div>
            <h2>Ошибка загрузки. Попробуйте повторить попытку позже </h2>
          </div>
        ) : (
          <>{status === 'loading' ? skeletons : movies}</>
        )}
      </Row>

      <CustomPagination page={page} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

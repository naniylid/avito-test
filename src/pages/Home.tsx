import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../core/redux/store';
import { useSelector } from 'react-redux';
import { Divider, Row } from 'antd';
import qs from 'qs';
import '../assets/styles/Home.module.scss';
import { SearchFilm, Filter, CustomPagination, Skeleton, Limit } from '../components';

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

  const { sort, page, searchValue, limit } = useSelector(selectFilterSlice);
  const { items, status } = useSelector(selectApiSlice);

  const sortBy = sort.sortProperty;

  const onChangePage = (value: number) => {
    dispatch(setPage(value));
  };

  const getMovies = async () => {
    const sortType = sortBy.includes('-') ? -1 : 1;
    const sortField = sortBy.replace('-', '');
    const notNullFields = sortField;
    const search = searchValue;

    dispatch(
      //Бизнес логика получения фильмов
      fetchMovies({
        page: String(page),
        sortType,
        search,
        sortField,
        notNullFields,
        limit: String(limit),
      }),
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortField);

      dispatch(
        setFilters({
          searchValue: params.search,
          page: Number(params.page),
          sort: sort || sortList[0],
          limit: Number(params.limit),
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
  }, [sortBy, searchValue, page]);

  // //Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getMovies();
    }
    isSearch.current = false;
  }, [sortBy, searchValue, page]);

  const movies = items.map((obj) => (
    <Link to={`/movie/${obj.id}`}>
      <CardItem {...obj} key={obj.id} />
    </Link>
  ));
  const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='main-block'>
      <SearchFilm />
      <div className='page-limit'>
        <h4>Количество фильмов на странице</h4> <Limit />
      </div>
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

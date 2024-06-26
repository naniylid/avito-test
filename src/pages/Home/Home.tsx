import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Divider, Row } from 'antd';
import qs from 'qs';

import './Home.module.scss';
import { SearchFilm, Filter, CustomPagination, Skeleton, Limit, CardItem } from '../../components';
import { sortList } from '../../components/Filter/Filter';

import { useAppDispatch } from '../../redux/store';
import { fetchMovies, selectApiSlice } from '../../redux/slices/api/apiSlice';
import {
  selectFilterSlice,
  setPage,
  setFilters,
  setLimit,
} from '../../redux/slices/filters/filterSlice';
import { SearchParams } from '../../redux/slices/api/ApiParamsTypes';

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
    const search = 'search?';
    const query = searchValue;

    dispatch(
      //Бизнес логика получения фильмов
      fetchMovies({
        limit: limit,
        page,
        sortType,
        query,
        sortField,
        notNullFields,
        search,
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
          searchValue: params.query,
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

  // //Если был первый рендер, то запрашиваем фильмы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getMovies();
    }
    isSearch.current = false;
  }, [sortBy, searchValue, page, limit]);

  //Количество фильмов на странице
  const handleLimitChange = (value: number | null) => {
    if (typeof value === 'number') {
      dispatch(setLimit(value));
    }
  };

  //Переход на страницу фильма при клике
  const movies = items.map((obj: any) => (
    <Link to={`/movie/${obj.id}`}>
      <CardItem {...obj} key={obj.id} />
    </Link>
  ));
  const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='main-block'>
      <SearchFilm />
      <div className='page-limit'>
        <h4>Количество фильмов на странице</h4> <Limit onChange={handleLimitChange} />
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

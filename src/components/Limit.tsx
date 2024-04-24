import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputNumber } from 'antd';
import { debounce } from 'lodash';
import { selectFilterSlice } from '../core/redux/slices/filterSlice';
import { setLimit } from '../core/redux/slices/filterSlice';
import { fetchMovies } from '../core/redux/slices/apiSlice';

const Limit: React.FC = () => {
  const dispatch = useDispatch();
  const { limit } = useSelector(selectFilterSlice);

  const debouncedHandleLimitChange = React.useRef(
    debounce((value: number | null) => {
      if (typeof value === 'number') {
        dispatch(setLimit(value));

        dispatch(fetchMovies({ limit: value }));
      }
    }, 150),
  ).current;

  const handleLimitChange = (value: number | null) => {
    debouncedHandleLimitChange(value);
  };

  return <InputNumber min={1} value={limit} onChange={handleLimitChange} />;
};

export default Limit;

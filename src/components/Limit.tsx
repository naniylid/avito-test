import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputNumber } from 'antd';
import { debounce } from 'lodash';
import { selectFilterSlice } from '../core/redux/slices/filterSlice';
import { setLimit } from '../core/redux/slices/filterSlice';

const Limit: React.FC = () => {
  const dispatch = useDispatch();
  const { limit } = useSelector(selectFilterSlice);

  const debouncedHandleLimitChange = React.useRef(
    debounce((value: number | null) => {
      if (value !== null) {
        dispatch(setLimit(value));
      }
    }, 100),
  ).current;

  const handleLimitChange = (value: number | null) => {
    debouncedHandleLimitChange(value);
  };

  return <InputNumber min={1} defaultValue={limit} onChange={handleLimitChange} />;
};

export default Limit;

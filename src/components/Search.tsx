import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { InputRef } from 'antd';

import { selectFilterSlice, setSearchValue, setValue } from '../redux/slices/filters/filterSlice';

const { Search } = Input;

const SearchFilm: React.FC = () => {
  const dispatch = useDispatch();
  const { value } = useSelector(selectFilterSlice);
  const inputRef = React.useRef<InputRef>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    dispatch(setValue(''));

    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 150),
    [],
  );

  const onSearch = (searchValue: string) => {
    updateSearchValue(searchValue);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(event.target.value));
    updateSearchValue(event.target.value);
  };

  const renderClearButton = () => {
    if (value) {
      return (
        <span className='ant-input-clear-icon' onClick={onClickClear} aria-label='Clear input' />
      );
    }
    return null;
  };

  return (
    <Search
      ref={inputRef}
      value={value}
      placeholder='Найти фильм'
      allowClear
      onSearch={onSearch}
      onChange={onChangeInput}
      style={{ width: 300 }}
      enterButton
      suffix={renderClearButton()}
    />
  );
};
export default SearchFilm;

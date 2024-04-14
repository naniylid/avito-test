import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../core/redux/slices/filterSlice';

const { Search } = Input;

const SearchFilm: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');

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
    setValue(event.target.value);
    updateSearchValue(event.target.value);
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
      onClear={onClickClear}
    />
  );
};
export default SearchFilm;

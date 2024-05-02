import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSort, setOpen, selectFilterSlice } from '../../redux/slices/filters/filterSlice';
import { SortType, SortPropertyEnum } from '../../redux/slices/filters/FiterTypes';

import './Filter.module.scss';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type SortPopup = {
  value: SortType;
};

export const sortList: SortItem[] = [
  { name: 'Год ↑', sortProperty: SortPropertyEnum.YEAR_DESC },
  { name: 'Год ↓', sortProperty: SortPropertyEnum.YEAR_ASC },
  { name: 'Страна ↑', sortProperty: SortPropertyEnum.COUNTRY_DESC },
  { name: 'Страна ↓', sortProperty: SortPropertyEnum.COUNTRY_ASC },
  { name: 'Возраст ↑', sortProperty: SortPropertyEnum.AGE_DESC },
  { name: 'Возраст ↓', sortProperty: SortPropertyEnum.AGE_ASC },
];

const Filter: React.FC<SortPopup> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const { open } = useSelector(selectFilterSlice);

  const onClickListOpen = (obj: SortItem) => {
    dispatch(setSort(obj));
    dispatch(setOpen(false));
  };

  React.useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        dispatch(setOpen(false));
      }
    };

    document.body.addEventListener('click', clickOutside);

    return () => document.body.removeEventListener('click', clickOutside);
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <b>Сортировка по:</b>
        <span onClick={() => dispatch(setOpen(!open))}>{value.name}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListOpen(obj)}
                id={`sort-item-${obj.sortProperty}`}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Filter;

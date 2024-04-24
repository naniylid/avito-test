import React from 'react';
import { useDispatch } from 'react-redux';

import { setSort } from '../core/redux/slices/filterSlice';
import { SortType, SortPropertyEnum } from '../@types/types';

import '../assets/styles/components/Filter.module.scss';

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

  const [open, setOpen] = React.useState(false);

  const onClickListOpen = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (!sortRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', clickOutside);

    return () => document.body.removeEventListener('click', clickOutside);
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListOpen(obj)}
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { FilterSliceState, SortPropertyEnum, SortType } from './FiterTypes';

const initialState: FilterSliceState = {
  searchValue: '',
  value: '',
  page: 1,
  sort: {
    name: 'Год ↑',
    sortProperty: SortPropertyEnum.YEAR_DESC,
  },
  limit: 15,
  open: false,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.page = Number(action.payload.page);
        state.sort = action.payload.sort;
      } else {
        state.page = 1;
        state.sort = {
          name: 'Год ↑',
          sortProperty: SortPropertyEnum.YEAR_DESC,
        };
      }
    },
  },
});

export const { setSort, setPage, setFilters, setSearchValue, setValue, setLimit, setOpen } =
  filterSlice.actions;

export const selectSort = (state: RootState) => state.filterSlice.sort;
export const selectFilterSlice = (state: RootState) => state.filterSlice;

export default filterSlice.reducer;

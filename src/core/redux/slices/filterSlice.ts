import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FilterSliceState, SortPropertyEnum, SortType } from '../../../@types/types';

const initialState: FilterSliceState = {
  searchValue: '',
  page: 1,
  sort: {
    name: 'Год',
    sortProperty: SortPropertyEnum.YEAR_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.page = Number(action.payload.page);
        state.sort = action.payload.sort;
      } else {
        state.page = 1;
        state.sort = {
          name: 'Год',
          sortProperty: SortPropertyEnum.YEAR_DESC,
        };
      }
    },
  },
});

export const { setSort, setPage, setFilters, setSearchValue } = filterSlice.actions;

export const selectSort = (state: RootState) => state.filterSlice.sort;
export const selectFilterSlice = (state: RootState) => state.filterSlice;

export default filterSlice.reducer;

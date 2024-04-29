import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { Movies } from '../../@types/MoviePropsTypes';

type FilmPageState = {
  item: Movies | null;
  currentPage: number;
};

const initialState: FilmPageState = {
  item: null,
  currentPage: 0,
};

const filmPageSlice = createSlice({
  name: 'filmPage',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<Movies | null>) {
      state.item = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setItem, setCurrentPage } = filmPageSlice.actions;

export const selectFilmPageSlice = (state: RootState) => state.filmPageSlice;

export default filmPageSlice.reducer;

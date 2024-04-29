import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { FilmStates } from './types';
import { Review } from '../../@types/MoviePropsTypes';

const initialState: FilmStates = {
  reviews: [],
  currentPage: 1,
  slidesToShow: 5,
};

const filmComponentsSlice = createSlice({
  name: 'filmComponents',
  initialState,
  reducers: {
    setReviews(state, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSlidesToShow(state, action: PayloadAction<number>) {
      state.slidesToShow = action.payload;
    },
  },
});

export const { setReviews, setCurrentPage, setSlidesToShow } = filmComponentsSlice.actions;

export const selectFilmComponentsSlice = (state: RootState) => state.filmComponentsSlice;

export default filmComponentsSlice.reducer;

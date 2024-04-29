import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { Movies } from '../../@types/MoviePropsTypes';

type RandomSliceState = {
  item: Movies | null;
};

const initialState: RandomSliceState = {
  item: null,
};

const randomSlice = createSlice({
  name: 'random',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<Movies | null>) {
      state.item = action.payload;
    },
  },
});

export const { setItem } = randomSlice.actions;

export const selectRandomSlice = (state: RootState) => state.randomSlice;

export default randomSlice.reducer;

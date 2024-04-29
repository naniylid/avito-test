import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import apiSlice from './slices/api/apiSlice';
import filterSlice from './slices/filters/filterSlice';
import filmComponentsSlice from '../components/FilmComponents/filmSlice';
import filmPageSlice from '../pages/Film/filmPageSlice';
import randomSlice from '../pages/RandomFilm/randomSlice';

export const store = configureStore({
  reducer: {
    apiSlice,
    filterSlice,
    filmComponentsSlice,
    filmPageSlice,
    randomSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

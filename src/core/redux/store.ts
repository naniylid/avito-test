import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import apiSlice from './slices/apiSlice';
import filterSlice from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    apiSlice,
    filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

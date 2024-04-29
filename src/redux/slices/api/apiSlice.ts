import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { identity, pickBy } from 'lodash';
import { RootState } from '../../store';
import { Status, SearchParams, FetchSliceState } from './ApiParamsTypes';
import { Movies, MovieResponse } from '../../../@types/MoviePropsTypes';

const API_KEY: string = import.meta.env.VITE_API_KEY as string;

export const fetchMovies = createAsyncThunk<Movies[], SearchParams>(
  'movie/fetchMoviesStatus',
  async (params) => {
    const { sortType, sortField, page, notNullFields, limit, query, search } = params;

    let url = `https://api.kinopoisk.dev/v1.4/movie`;

    if (query) {
      url += `/${search}`;
    } else {
      url += `?year=1980-2031`;
    }

    const response = await axios.get<MovieResponse>(url, {
      params: pickBy(
        {
          page: page,
          limit: limit,
          sortType,
          sortField,
          query,
          notNullFields,
        },
        identity,
      ),
      headers: {
        accept: 'application/json',
        'X-API-KEY': API_KEY,
      },
    });

    return response.data.docs;
  },
);

const initialState: FetchSliceState = {
  items: [],
  status: Status.LOADING,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<MovieResponse>) {
      if (Array.isArray(action.payload.docs)) {
        state.items = action.payload.docs;
      } else {
        console.error('Некорректный формат данных в ответе');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = apiSlice.actions;
export const selectApiSlice = (state: RootState) => state.apiSlice;

export default apiSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { identity, pickBy } from 'lodash';
import { RootState } from '../store';
import {
  Status,
  Movies,
  MovieResponse,
  SearchParams,
  FetchSliceState,
} from '../../../@types/types';

export const apiKey = 'RZZDNZ1-MHH460D-M3651KJ-QSMX0VZ';

export const fetchMovies = createAsyncThunk<Movies[], SearchParams>(
  'movie/fetchMoviesStatus',
  async (params) => {
    const { sortType, sortField, search, page, notNullFields, limit } = params;

    const url = 'https://api.kinopoisk.dev/v1.4/movie?year=2010-2027';

    const response = await axios.get<MovieResponse>(url, {
      params: pickBy(
        {
          page: page,
          limit: limit,
          sortType,
          sortField,
          search,
          notNullFields,
        },
        identity,
      ),
      headers: {
        accept: 'application/json',
        'X-API-KEY': apiKey,
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
      // state.items = action.payload;
      if (Array.isArray(action.payload.docs)) {
        // Присваиваем массив фильмов из поля `docs` в состояние items
        state.items = action.payload.docs;
      } else {
        // Если docs не является массивом (ошибка структуры данных)
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

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchMovieById } from '../../pages/fetchMovie';

const mock = new MockAdapter(axios);

export function setupApiMock() {
  const mockMovieId = '123456';
  const mockMovieData = {
    id: '123456',
    title: 'Mock Movie Title',
    year: 2022,
    posterUrl: 'path/to/poster.jpg',
    genres: [{ name: 'Drama' }, { name: 'Comedy' }],
    poster: { url: 'path/to/poster.jpg' },
    ageRating: 12,
    countries: [{ name: 'USA' }, { name: 'UK' }],
    movieId: '1',
    persons: [{ name: 'Actor' }, { name: 'Actor2' }],
  };

  mock.onGet(`https://api.kinopoisk.dev/v1.4/movie/${mockMovieId}`).reply(200, mockMovieData);
}

export function cleanupApiMock() {
  mock.reset();
}

export async function testFetchMovieById() {
  const mockMovieId = '123456';

  try {
    const result = await fetchMovieById(mockMovieId);
    return result;
  } catch (error) {
    throw error;
  }
}

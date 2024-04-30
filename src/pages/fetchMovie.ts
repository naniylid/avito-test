import axios from 'axios';

const API_KEY: string = import.meta.env.VITE_API_KEY as string;

export async function fetchMovieById(id: string | undefined) {
  try {
    const { data } = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
      headers: {
        accept: 'application/json',
        'X-API-KEY': API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.error('Ошибка при запросе фильма:', error);
    throw error;
  }
}

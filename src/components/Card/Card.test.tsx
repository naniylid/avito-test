import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import CardItem from './Card';
import { setupApiMock, cleanupApiMock, testFetchMovieById } from '../../tests/mocks/fetchMovieById'; // Импортируем утилиту для мокирования API

beforeAll(() => {
  setupApiMock();
});

afterAll(() => {
  cleanupApiMock();
});

describe('CardItem component', () => {
  it('renders movie details correctly', async () => {
    const movieData = await testFetchMovieById(); // Получаем данные о фильме с помощью утилиты

    render(<CardItem {...movieData} />);

    // Проверяем, что заголовок (название фильма) отображается
    const titleElement = screen.findByText('Mock Movie Title');
    expect(titleElement).toBeDefined();

    // Проверяем, что жанры отображаются правильно
    const genresElement = screen.findByText('Drama, Comedy');
    expect(genresElement).toBeDefined();

    // Проверяем другие детали фильма (год, постер и т.д.)
    const yearElement = screen.findByText(`Год: ${movieData.year}`);
    expect(yearElement).toBeDefined();

    const posterElement = screen.getByAltText('film');
    expect(posterElement).toHaveAttribute('src', 'path/to/poster.jpg');
  });
});

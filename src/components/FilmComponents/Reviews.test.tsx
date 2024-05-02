import { render, screen, waitFor } from '../../utils/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Reviews from './Reviews';
import '@testing-library/jest-dom';

describe('Reviews component', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('отображает сообщение о отсутствии отзывов', async () => {
    mockAxios.onGet('https://api.kinopoisk.dev/v1.4/review?movieId=456').reply(200, { docs: [] });

    render(<Reviews movieId='456' />);

    // Ожидаем загрузки отзывов
    await waitFor(() => {
      expect(screen.getByText(/Пока нет отзывов/)).toBeInTheDocument();
    });
  });
});

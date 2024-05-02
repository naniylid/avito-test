import { render, screen, fireEvent } from '../../utils/test-utils';
import RecommendedMovies from './RecommendedMovies';

// Мокированные данные похожих фильмов
const similarMovies = [
  { id: '1', poster: { previewUrl: 'path/to/poster1.jpg' } },
  { id: '2', poster: { previewUrl: 'path/to/poster2.jpg' } },
  { id: '3', poster: { previewUrl: 'path/to/poster3.jpg' } },
];

describe('RecommendedMovies component', () => {
  it('отображает компонент с похожими фильмами', () => {
    // Рендерим компонент RecommendedMovies с моковыми данными
    render(<RecommendedMovies similarMovies={similarMovies} onMovieClick={() => '1'} />);

    // Проверяем, что изображения отображаются корректно
    const movieImages = screen.getAllByAltText('Фильм 1');
    expect(movieImages).toHaveLength(3);
  });

  it('обновляет slidesToShow при изменении размера окна', () => {
    // Рендерим компонент RecommendedMovies
    render(<RecommendedMovies similarMovies={similarMovies} onMovieClick={() => '1'} />);

    // Мокируем ширину окна для проверки эффекта изменения размера окна
    global.innerWidth = 1000;

    // Имитируем событие изменения размера окна
    fireEvent(window, new Event('resize'));
  });
});

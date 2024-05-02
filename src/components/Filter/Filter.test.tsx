import { SortPropertyEnum, SortType } from '../../redux/slices/filters/FiterTypes';
import { render, screen, fireEvent } from '../../utils/test-utils';
import Filter from './Filter';

const sortValue: SortType = {
  name: 'Год ↑',
  sortProperty: SortPropertyEnum.YEAR_DESC,
};

describe('Filter component', () => {
  it('открывает и закрывает выпадающее меню при клике на метку', () => {
    // Рендерим компонент Filter с заданным значением сортировки
    render(<Filter value={sortValue} />);

    // Проверяем, что выпадающее меню закрыто изначально
    const popupClosed = screen.queryByText('Год ↓');
    expect(popupClosed).toBeNull();

    // Кликаем на метку сортировки
    const label = screen.getByText('Сортировка по:');
    fireEvent.click(label);

    // Кликаем снова на метку сортировки
    fireEvent.click(label);

    // Проверяем, что выпадающее меню закрыто после повторного клика
    const closedPopup = screen.queryByTestId('sort-item-YEAR_ASC');
    expect(closedPopup).toBeNull();
  });
});

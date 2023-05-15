import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando componente Header', () => {
  it('Testa o alert', async () => {
    const alertSpy = jest.spyOn(global, 'alert');

    rendeWithRouter(<App />, { initialEntries: ['/drinks'] });
    const btnL = screen.getByTestId('search-top-btn');
    userEvent.click(btnL);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'lemon');

    const btnFirstLetter = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(btnFirstLetter);

    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);

    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });
    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  it('Testa o alert', async () => {
    const alertSpy = jest.spyOn(global, 'alert');

    rendeWithRouter(<App />, { initialEntries: ['/meals'] });
    const btnL = screen.getByTestId('search-top-btn');
    userEvent.click(btnL);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'milk');

    const btnFirstLetter = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(btnFirstLetter);

    const btnSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(btnSearch);

    await waitFor(() => {
      expect(alertSpy).toBeCalled();
    });
    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});

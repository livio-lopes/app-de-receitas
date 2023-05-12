import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mealIngredients from './mocks/mealIngredients';
import drinkIngredients from './mocks/drinkIngredients';

describe('Testando componente Header', () => {
  it('Verifica comportamento da barra search no componente Meals', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mealIngredients),
    });
    rendeWithRouter(<App />, { initialEntries: ['/meals'] });
    const btnLupa = screen.getByRole('img', { name: /pesquisa/i });
    userEvent.click(btnLupa);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'milk');
    const btnIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const btnName = screen.getByRole('radio', { name: /name/i });
    userEvent.click(btnIngredient);
    expect(btnIngredient).toBeChecked();
    expect(btnName).not.toBeChecked();
    userEvent.click(btnName);
    expect(btnIngredient).not.toBeChecked();
    expect(btnName).toBeChecked();
    userEvent.click(btnIngredient);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('1-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('2-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('3-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('4-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('5-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('6-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('7-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('8-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('9-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('10-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('11-recipe-card')).toBeInTheDocument();
    /*  userEvent.type(searchInput, 'pizza');
    userEvent.click(btnSearch);
    userEvent.click(btnName);
     */
  });
  it('Verifica comportamento da barra search no componente Drinks', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (drinkIngredients),
    });
    rendeWithRouter(<App />, { initialEntries: ['/drinks'] });
    const btnLupa = screen.getByRole('img', { name: /pesquisa/i });
    userEvent.click(btnLupa);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'lemon');
    const btnIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const btnName = screen.getByRole('radio', { name: /name/i });
    userEvent.click(btnIngredient);
    expect(btnIngredient).toBeChecked();
    expect(btnName).not.toBeChecked();
    userEvent.click(btnName);
    expect(btnIngredient).not.toBeChecked();
    expect(btnName).toBeChecked();
    userEvent.click(btnIngredient);
    const btnSearch = screen.getByRole('button', { name: /search/i });
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('1-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('2-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('3-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('4-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('5-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('6-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('7-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('8-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('9-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('10-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('11-card-name')).toBeInTheDocument();
    const btnFirstLetter = screen.getByRole('radio', { name: /first letter/i });
    userEvent.type(searchInput, 'l');
    userEvent.click(btnFirstLetter);
    userEvent.click(btnSearch);
    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('1-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('2-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('3-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('4-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('5-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('6-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('7-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('8-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('9-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('10-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('11-recipe-card')).toBeInTheDocument();
  });
});


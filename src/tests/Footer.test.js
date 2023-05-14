import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Profile from '../pages/Profile';

describe('Testando componente Footer', () => {
  it('Verifica se todos os componentes estão na tela', () => {
    rendeWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    const drinkIcon = screen.getByRole('img', { name: /drinkIcon/i });
    expect(drinkIcon).toBeInTheDocument();
    const mealsIcon = screen.getByRole('img', { name: /mealIcon/i });
    expect(mealsIcon).toBeInTheDocument();
    userEvent.click(drinkIcon);
    const drinksTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(drinksTitle).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botão a tela é redirecionada para "/meals"', () => {
    const { history } = rendeWithRouter(<Profile />);
    const { location: { pathname } } = history;
    const mealsIcon = screen.getByRole('img', { name: /mealIcon/i });
    userEvent.click(mealsIcon);
    expect(pathname).toBe('/meals');
  });
});

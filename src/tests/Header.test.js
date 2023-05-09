import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando componente Header', () => {
  it('Verifica se todos os componentes estão na tela', () => {
    rendeWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    // const { history } =
    // const { pathname } = history.location;
    const profileIcon = screen.getByRole('img', { name: /perfil/i });
    expect(profileIcon).toBeInTheDocument();
    const titleDoneRecipes = screen.getByRole('heading', { name: /done/i });
    expect(titleDoneRecipes).toBeInTheDocument();
    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    /* console.log(pathname);
    const title = screen.getByRole('heading', { name: /profile/i, level: 1 });
    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/done-recipes');
    expect(pathname).toBe('/profile'); */
  });
});

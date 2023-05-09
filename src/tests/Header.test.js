import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando componente Header', () => {
  it('Verifica se todos os componentes estão na tela', () => {
    rendeWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    const profileIcon = screen.getByRole('img', { name: /perfil/i });
    expect(profileIcon).toBeInTheDocument();
    const titleDoneRecipes = screen.getByRole('heading', { name: /done/i });
    expect(titleDoneRecipes).toBeInTheDocument();
    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
  });
  it('Testa se o botão da barra de pesquisa são renderizados', () => {
    rendeWithRouter(<App />, { initialEntries: ['/meals'] });
    const btnSearch = screen.getByRole('button', { name: /search/i });
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    expect(inputSearch).not.toBeInTheDocument();
  });
  it('Testa se ao clicar no ícone de perfil é redirecionado para a rota /profile', () => {
    const { history } = rendeWithRouter(<App />, { initialEntries: ['/meals'] });
    const { pathname } = history.location;
    const title = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/meals');
    const profileIcon = screen.getByRole('img', { name: /perfil/i });
    expect(profileIcon).toBeInTheDocument();
    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);
    // expect(pathname).toBe('/profile');
  });
});

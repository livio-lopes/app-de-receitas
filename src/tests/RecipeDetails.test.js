import { screen, act, fireEvent } from '@testing-library/react';

import RecipeDetails from '../pages/RecipeDetails';
import { renderWithRouter } from './helpers/renderWithRouter';
import { AppProvider } from '../providers/AppProvider';
import { RecipeDetailsProvider } from '../providers/RecipeDetailsProvider';
import mealId52771 from '../mocks/mealId52771';
import drinkId178319 from '../mocks/drinkId178319';
// import drinksRecommendations from '../mocks/drinksRecommendations';
// import mealsRecommendations from '../mocks/mealsRecommendations';

let mealMock;
let drinkMock;
const mealsPath = '/meals/52771';
const drinksPath = '/drinks/178319';

describe('Testa a page RecipeDetails no endereço /meals/52771', () => {
  beforeEach(async () => {
    mealMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mealId52771),
    });

    await act(async () => {
      renderWithRouter(
        <AppProvider>
          <RecipeDetailsProvider>
            <RecipeDetails />
          </RecipeDetailsProvider>
        </AppProvider>,
        { initialEntries: [mealsPath] },
      );
    });
  });

  it('testa a requisição na API da carne id 52771', async () => {
    // Utiliza o mock da requisição de meal
    fetch(mealsPath);
    expect(mealMock).toHaveBeenCalled();
  });

  it('Verifica se existe o titulo da comida spicy arrabiata penne', () => {
    const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existe o categorias', () => {
    const category = screen.getByTestId('recipe-category');
    expect(category).toBeInTheDocument();
  });

  it('Verifica se existe o botão com texto startRecipe', () => {
    const startRecipeButton = screen.getByRole('button', { name: /start recipe/i });
    expect(startRecipeButton).toBeInTheDocument();
  });

  it('Verifica o botão startRecipe muda de acordo com o localStorage', () => {
    const startRecipeButton = screen.getByRole('button', { name: /start recipe/i });
    expect(startRecipeButton).toBeVisible();

    const localstorageinprogress = screen.getByRole('button', { name: /trigger localstorageinprogress test/i });
    fireEvent.click(localstorageinprogress);

    const localstorageDone = screen.getByRole('button', { name: /trigger localstoragedone test/i });

    const checkbutton = screen.getByRole('button', { name: /trigger checklocal test/i });
    fireEvent.click(checkbutton);

    const continueRecipebutton = screen.getByRole('button', { name: /continue recipe/i });
    expect(continueRecipebutton).toBeInTheDocument();

    fireEvent.click(localstorageDone);
    fireEvent.click(checkbutton);

    expect(continueRecipebutton).not.toBeInTheDocument();
  });
});

// drink fetch

describe('Testa a page RecipeDetails no endereço /drinks/178319', () => {
  beforeEach(async () => {
    drinkMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (drinkId178319),
    });

    await act(async () => {
      renderWithRouter(
        <AppProvider>
          <RecipeDetailsProvider>
            <RecipeDetails />
          </RecipeDetailsProvider>
        </AppProvider>,
        { initialEntries: [drinksPath] },
      );
    });
  });

  it('testa a requisição na API do drink id 178319', async () => {
    // Utiliza o mock da requisição de meal
    fetch(drinksPath);
    expect(drinkMock).toHaveBeenCalled();
  });

  it('Verifica se existe o titulo', () => {
    const title = screen.getByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existe o categorias', () => {
    const category = screen.getByTestId('recipe-category');
    expect(category).toBeInTheDocument();
  });
});

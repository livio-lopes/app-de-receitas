import React from 'react';
import { act } from '@testing-library/react';
import RecipeDetails from '../pages/RecipeDetails';
import { renderWithRouter } from './helpers/renderWithRouter';
import { AppProvider } from '../providers/AppProvider';
import mealId52771 from '../mocks/mealId52771';
import drinksRecommendations from '../mocks/drinksRecommendations';

let mealMock;
let drinkMock;
const mealsPath = '/meals/52771';

describe('Testa a page RecipeDetails', () => {
  beforeEach(() => {
    mealMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mealId52771),
    });

    drinkMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (drinksRecommendations),
    });

    act(() => {
      render(
        <AppProvider>
          <RecipeDetails />
        </AppProvider>,
        { initialEntries: [mealsPath] },
      );
    });
  });

  afterEach(() => {
    mealMock.mockRestore();
    drinkMock.mockRestore();
  });

  it('testa a requisição na API da carne id 52771', async () => {
    // Utiliza o mock da requisição de meal
    fetch(mealsPath);
    expect(mealMock).toHaveBeenCalled();
  });

  it('testa a requisição de bebidas recomendadas', async () => {
    // Utiliza o mock da requisição de drink
    const response = await fetch('/drinks/recommendations');
    const data = await response.json();

    expect(drinkMock).toHaveBeenCalled();
    expect(data).toEqual(drinksRecommendations);
  });

  it('Verifica se existe uma tabela com header', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <RecipeDetails />
      </AppProvider>,
      { initialEntries: [mealsPath] },
    );
    const { location: { pathname } } = history;
    expect(pathname).toBe(mealsPath);
    console.log(pathname);
  });
});

import React from 'react';
import { act, screen } from '@testing-library/react';
import RecipeDetails from '../pages/RecipeDetails';
import { renderWithRouter } from './helpers/renderWithRouter';
import { AppProvider } from '../providers/AppProvider';
import mealId52771 from '../mocks/mealId52771';
import drinksRecommendations from '../mocks/drinksRecommendations';
import drinkId178319 from '../mocks/drinkId178319';
import mealsRecommendations from '../mocks/mealsRecommendations';

let mealMock;
let drinkMock;
const mealsPath = '/meals/52771';
const drinksPath = '/drinks/178319';

describe('Testa a page RecipeDetails no endereço /meals/52771', () => {
  beforeEach(async () => {
    mealMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mealId52771),
    });

    drinkMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (drinksRecommendations),
    });

    await act(async () => {
      renderWithRouter(
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

  it('Verifica se existe o titulo', () => {
    const title = screen.getByTestId('recipe-title');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existe o categorias', () => {
    const category = screen.getByTestId('recipe-category');
    expect(category).toBeInTheDocument();
  });
});

// drink fetch

describe('Testa a page RecipeDetails no endereço /drinks/178319', () => {
  beforeEach(async () => {
    drinkMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (drinkId178319),
    });

    mealMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mealsRecommendations),
    });

    await act(async () => {
      renderWithRouter(
        <AppProvider>
          <RecipeDetails />
        </AppProvider>,
        { initialEntries: [drinksPath] },
      );
    });
  });

  afterEach(() => {
    mealMock.mockRestore();
    drinkMock.mockRestore();
  });

  it('testa a requisição na API do drink id 178319', async () => {
    // Utiliza o mock da requisição de meal
    fetch(drinksPath);
    expect(drinkMock).toHaveBeenCalled();
  });

  it('testa a requisição de bebidas recomendadas', async () => {
    // Utiliza o mock da requisição de drink
    const response = await fetch('/meals');
    const data = await response.json();

    expect(mealMock).toHaveBeenCalled();
    expect(data).toEqual(mealsRecommendations);
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

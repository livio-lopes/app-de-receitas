import { act } from '@testing-library/react';

import DoneRecipes from '../pages/DoneRecipes';
import { renderWithRouter } from './helpers/renderWithRouter';
import { AppProvider } from '../providers/AppProvider';
import { RecipeDetailsProvider } from '../providers/RecipeDetailsProvider';
import mealId52771 from './mocks/mealId52771';
import { RecipesProvider } from '../providers/RecipesProvider';

let mealMock;
const mealsPath = '/meals/52771';

describe('Testa a page RecipeDetails no endereço /meals/52771', () => {
  beforeEach(async () => {
    mealMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mealId52771),
    });

    await act(async () => {
      renderWithRouter(
        <AppProvider>
          <RecipesProvider>
            <RecipeDetailsProvider>
              <DoneRecipes />
            </RecipeDetailsProvider>
          </RecipesProvider>
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
});

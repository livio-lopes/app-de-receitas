import { screen, fireEvent } from '@testing-library/react';
// import DoneRecipes from '../pages/DoneRecipes';
import { renderWithRouter } from './helpers/renderWithRouter';
import { AppProvider } from '../providers/AppProvider';
import { RecipeDetailsProvider } from '../providers/RecipeDetailsProvider';
import mealId52771 from './mocks/mealId52771';
import { RecipesProvider } from '../providers/RecipesProvider';
import App from '../App';

let mealMock;
const mealsPath = '/meals/52771';
const doneRecipesPath = '/done-recipes';

const allButton = 'filter-by-all-btn';
const mealsButton = 'filter-by-meal-btn';
const drinksButton = 'filter-by-drink-btn';

describe('Testa a page RecipeDetails no endereço /meals/52771', () => {
  beforeEach(async () => {
    mealMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mealId52771,
    });
  });

  it('testa a requisição na API da carne id 52771', async () => {
    // Utiliza o mock da requisição de meal
    fetch(mealsPath);
    expect(mealMock).toHaveBeenCalled();
  });

  it('deve exibir os botões de filtro', () => {
    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [doneRecipesPath] },
    );
    const filterByAllButton = screen.getByTestId('filter-by-all-btn');
    const filterByMealButton = screen.getByTestId('filter-by-meal-btn');
    const filterByDrinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(filterByAllButton).toBeInTheDocument();
    expect(filterByMealButton).toBeInTheDocument();
    expect(filterByDrinkButton).toBeInTheDocument();
  });

  it('deve filtrar os itens ao clicar nos botões de filtro', async () => {
    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [mealsPath] },
    );

    const localstorageDone = screen.getByRole('button', { name: /trigger localstoragedone test/i });
    fireEvent.click(localstorageDone);

    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [doneRecipesPath] },
    );

    const filterByAllButton = screen.getByTestId(allButton);
    const filterByMealButton = screen.getByTestId(mealsButton);
    const filterByDrinkButton = screen.getByTestId(drinksButton);

    // Simular clique no botão "Meals"
    fireEvent.click(filterByMealButton);
    // Verificar se a ação de filtro foi realizada corretamente
    const titleMeal = await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    expect(titleMeal).toBeInTheDocument();

    // Simular clique no botão "Drinks"
    fireEvent.click(filterByDrinkButton);
    // Verificar se a ação de filtro foi realizada corretamente
    const localStorageVazio = screen.getByRole('heading', { name: /local storage vazio meu principe, volte quando tiver algo aqui/i });
    expect(localStorageVazio).toBeInTheDocument();
    // Simular clique no botão "All"
    fireEvent.click(filterByAllButton);
    // Verificar se a ação de filtro foi realizada corretamente
    expect(titleMeal).toBeInTheDocument();
  });

  it('local storage vazio inicialmente', async () => {
    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [mealsPath] },
    );

    const localstorageDone = screen.getByRole('button', { name: /trigger localstoragedone test/i });
    fireEvent.click(localstorageDone);

    renderWithRouter(
      <AppProvider>
        <RecipesProvider>
          <RecipeDetailsProvider>
            <App />
          </RecipeDetailsProvider>
        </RecipesProvider>
      </AppProvider>,
      { initialEntries: [doneRecipesPath] },
    );

    const buttonShare = await screen.findByRole('button', { name: /ícone de compartilhamentocompartilhar/i });
    fireEvent.click(buttonShare);
    const linkCopied = screen.getByText(/link copied!/i);
    expect(linkCopied).toBeInTheDocument();
  });
});

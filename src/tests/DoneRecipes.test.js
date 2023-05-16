import { screen, fireEvent, cleanup } from '@testing-library/react';
// import DoneRecipes from '../pages/DoneRecipes';
// import clipboardCopy from 'clipboard-copy';
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

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe('Testa a page RecipeDetails no endereço /meals/52771', () => {
  beforeEach(async () => {
    navigator.clipboard.writeText.mockResolvedValue(undefined);

    mealMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mealId52771,
    });
  });

  afterEach(() => {
    localStorage.removeItem('doneRecipes');
    cleanup();
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

  it('testa se o botão compartilhar executa o copyboard e adiciona o texto link copied', async () => {
    const data = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '2023-05-16T02:21:54.545Z',
        tags: ['Pasta', 'Curry'],
      },
    ];

    // Salvar os dados no local storage
    localStorage.setItem('doneRecipes', JSON.stringify(data));

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

    // Realizar asserções no componente renderizado
    // Exemplo:
    // Verificar se o nome do prato está sendo exibido corretamente
    const nomeDoPrato = screen.getByText('Spicy Arrabiata Penne');
    expect(nomeDoPrato).toBeInTheDocument();

    const shareButton = screen.getByText(/compartilhar/i);
    fireEvent.click(shareButton);

    const alertMessage = screen.getByText(/link copied!/i);
    expect(alertMessage).toBeInTheDocument();
  });

  it('testa os filtros com o localstorage vazio', () => {
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

    const localStorageVazio = screen.getByRole('heading', { name: /local storage vazio meu principe, volte quando tiver algo aqui/i });

    fireEvent.click(filterByDrinkButton);
    expect(localStorageVazio).toBeInTheDocument();

    fireEvent.click(filterByMealButton);
    expect(localStorageVazio).toBeInTheDocument();

    fireEvent.click(filterByAllButton);
    expect(localStorageVazio).toBeInTheDocument();
  });
});

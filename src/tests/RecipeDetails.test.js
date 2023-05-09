import React from 'react';
import { screen } from '@testing-library/react';
import RecipeDetails from '../pages/RecipeDetails';
import renderWithRouter from '../renderWithRouter';

describe('Testa a page RecipeDetails', () => {
  beforeEach(() => {
    // jest.spyOn(global, 'fetch').mockResolvedValue({
    //   json: async () => (mockPlanets),
    // });
    renderWithRouter(
      <RecipeDetails />,
    );
  });
  it('Verifica se existe uma tabela com header', async () => {
    const nameColumn = await screen.findByText(/name/i);
    expect(nameColumn).toBeInTheDocument();
  });
});

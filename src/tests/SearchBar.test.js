// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando componente Header', () => {
  it('Verifica se todos os componentes estão na tela', () => {
    rendeWithRouter(<App />, { initialEntries: ['/done-recipes'] });
  });
});

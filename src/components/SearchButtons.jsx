import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../providers/RecipesProvider';
import styles from './SearchButtons.module.css';
import allIcon from '../images/All.svg';
import iconFilter from '../util/searchButtonsUtils';

export default function SearchButtons() {
  const { categories,
    setRecipes,
    fetchRecipesByCategory,
    setCategoryFilter,
    categoryFilter } = useContext(RecipesContext);

  const location = useLocation();
  const rotaAtual = location.pathname;
  const URL = rotaAtual === '/drinks'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='
    : 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const MAX = 12;

  async function searchByCategory(param) {
    if (categoryFilter === param) {
      setCategoryFilter('');
      fetchRecipesByCategory(rotaAtual);
    } else {
      setCategoryFilter(param);
      const response = await fetch(`${URL}${param}`);
      const data = await response.json();
      const final = data[rotaAtual.replace('/', '')].slice(0, MAX);
      setRecipes(final);
    }
  }

  return (
    <div className={ styles.container__btns }>
      <button
        className={ styles.btns__search }
        type="button"
        data-testid="All-category-filter"
        onClick={ () => fetchRecipesByCategory(rotaAtual) }
      >
        <img src={ allIcon } alt="icon all" />
        <p>All</p>
      </button>
      {categories.map((category) => (
        <button
          className={ styles.btns__search }
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => searchByCategory(category.strCategory) }
        >
          <img
            src={ iconFilter(category.strCategory) }
            alt={ `${category.strCategory}` }
          />
          <p>{category.strCategory}</p>
        </button>
      ))}
    </div>
  );
}

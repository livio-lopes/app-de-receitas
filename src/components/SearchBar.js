import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  fetchMealsIngredient,
  fetchMealsNameSearch,
  fetchMealsFirstLetter,
  fetchDrinksIngredient,
  fetchDrinksNameSearch,
  fetchDrinksFirstLetter,
} from '../hooks/useFetch';
import { RecipesContext } from '../providers/RecipesProvider';

const MAX_RECIPES = 12;

function SearchBar() {
  const { setRecipes } = useContext(RecipesContext);

  const [searchInput, setSearchInput] = useState('');
  const [radioSearch, setsetRadioSearch] = useState(null);
  const history = useHistory();
  const { pathname } = history.location;

  const searchMeals = async () => {
    let data = [];
    if (radioSearch === 'ingredient') {
      data = await fetchMealsIngredient(searchInput);
    } if (radioSearch === 'name') {
      data = await fetchMealsNameSearch(searchInput);
    } if (radioSearch === 'firstLetter') {
      const inputArray = searchInput.split('');
      data = await fetchMealsFirstLetter(inputArray[0]);
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }

    if (data.meals === null || data.meals === undefined) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (data.meals.length === 1) {
      history.push(`/meals/${data.meals[0].idMeal}`);
    } else if (data.meals.length > 1) {
      setRecipes(data.meals.slice(0, MAX_RECIPES));
    }
  };

  const searchDrinks = async () => {
    let data = [];
    if (radioSearch === 'ingredient') {
      data = await fetchDrinksIngredient(searchInput);
    } if (radioSearch === 'name') {
      data = await fetchDrinksNameSearch(searchInput);
    } if (radioSearch === 'firstLetter') {
      const inputArray = searchInput.split('');
      data = await fetchDrinksFirstLetter(inputArray[0]);
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }

    if (data.drinks === null || data.drinks === undefined) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (data.drinks.length === 1) {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    } else if (data.drinks.length > 1) {
      setRecipes(data.drinks.slice(0, MAX_RECIPES));
    }
  };

  const handleClickSearch = () => {
    if (searchInput.length > 0) {
      if (pathname === '/meals') {
        searchMeals();
      } else if (pathname === '/drinks') {
        searchDrinks();
      }
    }
  };

  return (
    <form>
      <input
        name="searchInput"
        value={ searchInput }
        data-testid="search-input"
        placeholder="Search"
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <label>
        Ingredient
        <input
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target }) => setsetRadioSearch(target.value) }
        />
      </label>
      <label>
        Name
        <input
          type="radio"
          name="search"
          data-testid="name-search-radio"
          value="name"
          onChange={ ({ target }) => setsetRadioSearch(target.value) }
        />
      </label>
      <label>
        First letter
        <input
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ ({ target }) => setsetRadioSearch(target.value) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClickSearch }
      >
        Search
      </button>
    </form>
  );
}
export default SearchBar;

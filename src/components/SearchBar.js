import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  fetchMealsIngredient,
  fetchMealsNameSearch,
  fetchMealsFirstLetter,
  fetchDrinksIngredient,
  fetchDrinksNameSearch,
  fetchDrinksFirstLetter,
} from '../hooks/useFetch';

function SearchBar() {
  const [searchInput, setSeachInput] = useState('');
  const [radioSearch, setsetRadioSearch] = useState(null);

  const history = useHistory();

  const searcMeals = async () => {
    if (radioSearch === 'ingredient') {
      const data = await fetchMealsIngredient(searchInput);
      return data;
    } if (radioSearch === 'name') {
      const data = await fetchMealsNameSearch(searchInput);
      return data;
    } if (radioSearch === 'firstLetter') {
      if (searchInput.length > 1) {
        global.alert(searchInput);
      } else {
        const data = await fetchMealsFirstLetter(searchInput);
        return data;
      }
    }
    if (data.meals.length > 1) {
      history.push('/meals/52771'); // utilizando um id para teste => 52771
    }
  };

  const searchDrinks = async () => {
    if (radioSearch === 'ingredient') {
      const data = await fetchDrinksIngredient(searchInput);
      return data;
    } if (radioSearch === 'name') {
      const data = await fetchDrinksNameSearch(searchInput);
      return data;
    } if (radioSearch === 'firstLetter') {
      if (searchInput.length > 1) {
        global.alert(searchInput);
      } else {
        const data = await fetchDrinksFirstLetter(searchInput);
        return data;
      }
    }
    if (data.drinks.length > 1) {
      history.push('/meals/178319'); // utilizando um id para teste => :id-da-receita
    }
  };

  const handleClickSearch = async () => {
    if (pathname === '/meals') {
      searcMeals();
    } else if (pathname === '/drinks') {
      searchDrinks();
    }
  };

  return (
    <form>
      <input
        name="searchInput"
        data-testid="search-input"
        placeholder="Pesquise aqui"
        onChange={ ({ target }) => setSeachInput(target.value) }
      />
      <label>
        Ingredient
        <input
          type="radio"
          name="search"
          data-testid="ingredient-search-bar"
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
        type="exec-search-btn"
        onClick={ handleClickSearch }
      >
        Search
      </button>
    </form>
  );
}
export default SearchBar;

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

const MAX12 = 12;

function SearchBar() {
  const [searchInput, setSeachInput] = useState('');
  const [radioSearch, setsetRadioSearch] = useState(null);
  const [top12Meals, setTop12Meals] = useState([]);
  const [top12Drinks, setTop12Drinks] = useState([]);
  const [moreThen12Meals, setMoreThen12Meals] = useState(false);
  const [moreThen12Drinks, setMoreThen12Drinks] = useState(false);

  const history = useHistory();

  const searcMeals = async () => {
    if (radioSearch === 'ingredient') {
      const data = await fetchMealsIngredient(searchInput);
      setTop12Meals(data.meals.slice(0, MAX12));
    } if (radioSearch === 'name') {
      const data = await fetchMealsNameSearch(searchInput);
      setTop12Meals(data.meals.slice(0, MAX12));
    } if (radioSearch === 'firstLetter') {
      if (searchInput.length > 1) {
        global.alert('If you choose option "first Letter", type only one letter');
      } else {
        const data = await fetchMealsFirstLetter(searchInput);
        setTop12Meals(data.meals.slice(0, MAX12));
      }
    }
    if (data.meals.length === 1) {
      history.push('/meals/52771'); // utilizando um id para teste => 52771
    } else if (data.meals.length > 1) {
      setMoreThen12Meals(true);
    } else {
      global.alert('No recipe was found');
    }
  };

  const searchDrinks = async () => {
    if (radioSearch === 'ingredient') {
      const data = await fetchDrinksIngredient(searchInput);
      setTop12Drinks(data.drinks.slice(0, MAX12));
    } if (radioSearch === 'name') {
      const data = await fetchDrinksNameSearch(searchInput);
      setTop12Drinks(data.drinks.slice(0, MAX12));
    } if (radioSearch === 'firstLetter') {
      if (searchInput.length > 1) {
        global.alert(searchInput);
      } else {
        const data = await fetchDrinksFirstLetter(searchInput);
        setTop12Drinks(data.drinks.slice(0, MAX12));
      }
    }
    if (data.drinks.length === 1) {
      history.push('/meals/178319'); // utilizando um id para teste => :id-da-receita
    } else if (data.drinks.length > 1) {
      setMoreThen12Drinks(true);
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
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
    <>
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
      {
        moreThen12Meals
          && (
            top12Meals.map((top, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>topMeal.strMeal</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ topMeal.strMealThumb }
                  alt="iamgem da receita"
                />
              </div>
            ))
          )
      }

      {
        moreThen12Drinks
          && (
            top12Drinks.map((top, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>topDrink.strDrink</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ topDrink.strDrinkThumb }
                  alt="iamgem da receita"
                />
              </div>
            ))
          )
      }
    </>
  );
}
export default SearchBar;

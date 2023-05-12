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
      setMoreThen12Meals(true);
      setTop12Meals(data.meals);
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
      setTop12Drinks(data.drinks);
      setMoreThen12Drinks(true);
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
    <>
      <form>
        <input
          name="searchInput"
          data-testid="search-input"
          placeholder="Search"
          onChange={ ({ target }) => setSeachInput(target.value) }
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
      {
        moreThen12Meals
          && (
            top12Meals.slice(0, MAX12).map((topMeal, index) => (
              <div
                style={ { display: 'inline-block' } }
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <p data-testid={ `${index}-card-name` }>{topMeal.strMeal}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ topMeal.strMealThumb }
                  alt="recipe"
                  style={ { height: '100px', width: '100px' } }
                />
              </div>
            ))
          )
      }

      {
        moreThen12Drinks
          && (
            top12Drinks.slice(0, MAX12).map((topDrink, index) => (
              <div
                style={ { display: 'inline-block' } }
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <p data-testid={ `${index}-card-name` }>{topDrink.strDrink}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ topDrink.strDrinkThumb }
                  alt="recipe"
                  style={ { height: '100px', width: '100px' } }
                />
              </div>
            ))
          )
      }
    </>
  );
}
export default SearchBar;

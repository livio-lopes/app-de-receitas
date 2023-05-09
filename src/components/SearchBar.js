import React, { useState, useCallback } from 'react';
import fetchData from '../hooks/useFetch';

function SearchBar() {
  const [searchInput, setSeachInput] = useState('');
  const [searchIngredient, setSeachIngredient] = useState(null);

  const handleClickSearch = async () => {
    if (searchIngredient != null) {
      const data = await fetchData(searchInput);
      return console.log(data);
    }
    return console.log('xablau');
  };

  /* console.log(data);
    console.log(searchInput); */

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
          value="ingredientSearchBar"
          onChange={ ({ target }) => setSeachIngredient(target.value) }
        />
      </label>
      <label>
        Name
        <input
          type="radio"
          name="search"
          data-testid="name-search-radio"
          value="nameSearchRadio"
        />
      </label>
      <label>
        First letter
        <input
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          value="firstLetterSearchRadio"
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

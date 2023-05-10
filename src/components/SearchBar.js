import React, { useState } from 'react';
import {
  fetchDataIngredient,
  fetchDataNameSearch,
  fetchDataFirstLetter,
} from '../hooks/useFetch';

function SearchBar() {
  const [searchInput, setSeachInput] = useState('');
  const [radioSearch, setsetRadioSearch] = useState(null);

  const handleClickSearch = async () => {
    if (radioSearch === 'ingredient') {
      const data = await fetchDataIngredient(searchInput);
      return data;
    } if (radioSearch === 'name') {
      const data = await fetchDataNameSearch(searchInput);
      return data;
    } if (radioSearch === 'firstLetter') {
      if (searchInput.length > 1) {
        global.alert(searchInput);
      } else {
        const data = await fetchDataFirstLetter(searchInput);
        return data;
      }
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

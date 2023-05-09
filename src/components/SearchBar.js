import React from 'react';

function SearchBar() {
  return (
    <form>
      <input
        // name="searchInput"
        // value="searchInput"
        data-testid="search-input"
        placeholder="Pesquise aqui"
      />
      <label>
        Ingredient
        <input
          type="radio"
          name="ingredientSearchBar"
          data-testid="ingredient-search-bar"
          value="ingredientSearchBar"
        />
      </label>
      <label>
        Name
        <input
          type="radio"
          name="nameSearchRadio"
          data-testid="name-search-radio"
          value="nameSearchRadio"
        />
      </label>
      <label>
        First letter
        <input
          type="radio"
          name="firstLetterSearchRadio"
          data-testid="first-letter-search-radio"
          value="firstLetterSearchRadio"
        />
      </label>
      <button type="exec-search-btn">
        Buscar
      </button>
    </form>
  );
}
export default SearchBar;

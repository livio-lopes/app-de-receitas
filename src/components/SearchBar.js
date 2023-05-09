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
      <input
        type="radio"
        name="ingredientSearchBar"
        data-testid="ingredient-search-bar"
        value="ingredientSearchBar"
      />
    </form>
  );
}
export default SearchBar;

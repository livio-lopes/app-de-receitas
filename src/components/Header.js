import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [searchBar, setSearchBar] = useState(false);

  const history = useHistory();
  const { location, push } = history;
  const { pathname } = location;
  const handleTitle = () => {
    const arrayPath = pathname.split('');
    const title = arrayPath.splice(1, arrayPath.length);
    return title;
  };

  const handleSearchBar = () => {
    if (searchBar === true) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  return (
    <>
      <button
        type="submit"
        onClick={ () => push('/profile') }
        data-testid="profile-top-btn"
      >
        <img
          src={ profileIcon }
          alt="perfil"
        />
      </button>
      {
        (pathname === '/meals' || pathname === '/drinks')
        && (
          <button
            type="button"
            onClick={ handleSearchBar }
            data-testid="search-top-btn"
          >
            <img
              src={ searchIcon }
              alt="pesquisa"
            />
          </button>
        )
      }
      <h1 data-testid="page-title">{handleTitle()}</h1>
      {
        (searchBar)
        && (
          <input
            // name="searchInput"
            // value="searchInput"
            data-testid="search-input"
            placeholder="Pesquise aqui"
            // onChange={ () => console.log('b') }
          />
        )
      }
    </>
  );
}

export default Header;

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const captalize = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

function Header() {
  const [searchBar, setSearchBar] = useState(false);

  const history = useHistory();
  const { location, push } = history;
  const { pathname } = location;

  const handleTitle = () => {
    const arrayPath = pathname.split('/');
    const title = arrayPath[arrayPath.length - 1].split('-')
      .map((arr) => (
        captalize(arr))).join(' ');
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
          <SearchBar />

        )
      }

    </>
  );
}

export default Header;

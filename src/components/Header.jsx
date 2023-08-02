import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import mealsIcon from '../images/icone-prato.svg';
import drinkIcon from '../images/icone-bebida.svg';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import helpmonHeader from '../images/helpmonHeader.svg';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

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
    <div className={ styles.container__header }>
      <div className={ styles.container__imgBtns }>
        <img
          className={ styles.logo }
          src={ helpmonHeader }
          alt="logo header"
        />
        <div>

          <button
            className={ styles.btns }
            type="submit"
            onClick={ () => push('/profile') }
          >
            <img
              className={ styles.icon }
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="perfil"
            />
          </button>
          <button
            className={ styles.btns }
            type="button"
            onClick={ handleSearchBar }
          >
            <img
              className={ styles.icon }
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search"
            />
          </button>
        </div>
      </div>
      <div className={ styles.container__title }>
        <img
          src={ handleTitle() === 'Meals' ? mealsIcon : drinkIcon }
          alt={ `${handleTitle()}` }
        />
        <h1 data-testid="page-title">{handleTitle()}</h1>
      </div>
      { (searchBar) && (<SearchBar />)}
    </div>
  );
}

export default Header;

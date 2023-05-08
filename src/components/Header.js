import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { pathname } = history.location;
  const arrayPath = pathname.split('');
  const title = arrayPath.splice(1, 0);

  return (
    <>
      <button
        type="submit"
        onClick={ () => console.log('a') }
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
              type="submit"
              data-testid="search-top-btn"
              onClick={ () => console.log('a') }
            >
              <img
                src={ searchIcon }
                alt="pesquisa"
              />
            </button>
          )
      }
      <h1 data-testid="page-title">{ title }</h1>
    </>
  );
}

export default Header;

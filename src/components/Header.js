import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { location, push } = history;
  const { pathname } = location;
  const arrayPath = pathname.split('');
  const title = arrayPath.splice(1, arrayPath.length);

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

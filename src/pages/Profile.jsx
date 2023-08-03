import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Profile.module.css';
import iconFilter from '../util/searchButtonsUtils';

export default function Profile() {
  const history = useHistory();
  const userLogin = () => {
    if (localStorage.getItem('user')) {
      const localUser = JSON.parse(localStorage.getItem('user'));
      return localUser.email;
    } return '';
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className={ styles.container__profile }>
      <Header />
      <div className={ styles.container__menu }>
        <h3
          data-testid="profile-email"
        >
          {userLogin()}

        </h3>
        <button
          className={ styles.btns__profile }
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          <img src={ iconFilter('Done Recipes') } alt="icon" />
          <span>Done Recipes</span>
        </button>
        <button
          className={ styles.btns__profile }
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          <img src={ iconFilter('Favorites') } alt="icon" />
          <span>Favorite Recipes</span>
        </button>
        <button
          className={ styles.btns__profile }
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLogout }
        >
          <img src={ iconFilter('Logout') } alt="icon" />
          <span>Logout</span>
        </button>
      </div>
      <Footer />
    </div>
  );
}

import React from 'react';
import Header from '../components/Header';

export default function Profile() {
  const userLogin = () => {
    if (localStorage.getItem('user')) {
      const localUser = JSON.parse(localStorage.getItem('user'));
      return localUser.email;
    } return '';
  };

  return (
    <div>
      <Header />
      <h5 data-testid="profile-email">{userLogin()}</h5>
      <button
        data-testid="profile-done-btn"
        type="button"
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
      >
        Logout
      </button>
    </div>
  );
}

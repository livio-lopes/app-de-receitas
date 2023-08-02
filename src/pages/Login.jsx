import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../images/helpmom.svg';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const history = useHistory();
  const loginApp = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/meals');
  };
  const validationAccess = () => {
    const validEmail = (/\S+@\S+\.\S+/i).test(user.email);
    const minPasswordLength = 6;
    const validPassword = user.password.length >= minPasswordLength;
    console.log(validEmail, validPassword);
    return !(validEmail && validPassword);
  };
  return (
    <div className={ styles.container__login }>
      <img className={ styles.image__logo } src={ logo } alt="Logo Principal" />
      <h1>Login</h1>
      <label htmlFor="email">
        <input
          className={ styles.input__login }
          type="email"
          name="email"
          value={ user.email }
          data-testid="email-input"
          placeholder="seu@email.com"
          onChange={ ({ target: { value } }) => setUser({ ...user, email: value }) }
        />
      </label>
      <label htmlFor="password">
        <input
          className={ styles.input__login }
          type="password"
          name="password"
          value={ user.password }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ ({ target: { value } }) => setUser({ ...user, password: value }) }
        />
      </label>
      <button
        className={ styles.button__enabled }
        type="button"
        data-testid="login-submit-btn"
        disabled={ validationAccess() }
        onClick={ () => loginApp() }
      >
        Entrar
      </button>
    </div>
  );
}

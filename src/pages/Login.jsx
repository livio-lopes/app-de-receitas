import React, { useState } from 'react';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });

  const validationAccess = () => {
    const validEmail = (/\S+@\S+\.\S+/i).test(user.email);
    const minPasswordLength = 6;
    const validPassword = user.password.length > minPasswordLength;
    console.log(validEmail, validPassword);
    return !(validEmail && validPassword);
  };

  const loginApp = () => {
    localStorage.setItem('user', { email: user.email });
  };
  return (

    <div>
      <label htmlFor="email">
        <input
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
          type="password"
          name="password"
          value={ user.password }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ ({ target: { value } }) => setUser({ ...user, password: value }) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ validationAccess() }
        onClick={ () => loginApp() }
      >
        Enter

      </button>
    </div>
  );
}

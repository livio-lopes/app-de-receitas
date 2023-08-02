import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './Footer.module.css';

export default function Footer() {
  const history = useHistory();

  return (
    <div
      data-testid="footer"
      className={ styles.container__footer }
    >
      <div className={ styles.container__centerFooter }>

        <button
          className={ styles.btns__footer }
          type="button"
          onClick={ () => history.push('/drinks') }
        >
          <img
            data-testid="drinks-bottom-btn"
            type="button"
            src={ drinkIcon }
            alt="drinkIcon"
          />
        </button>
        <button
          className={ styles.btns__footer }
          type="button"
          data-testid="btn-meal"
          onClick={ () => history.push('/meals') }
        >
          <img
            data-testid="meals-bottom-btn"
            type="button"
            src={ mealIcon }
            alt="mealIcon"
          />
        </button>
      </div>
    </div>
  );
}

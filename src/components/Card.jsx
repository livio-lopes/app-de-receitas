import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './Card.module.css';
import { RecipesContext } from '../providers/RecipesProvider';

export default function Card({ recipe, index }) {
  const location = useLocation();
  const rotaAtual = location.pathname;
  const history = useHistory();
  const { setId } = useContext(RecipesContext);

  function redireciona() {
    setId(recipe.idMeal ? recipe.idMeal : recipe.idDrink);
    history.push(`${rotaAtual}/${recipe.idMeal ? recipe.idMeal : recipe.idDrink}`);
  }

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <button
        className={ styles.btn__card }
        type="button"
        onClick={ () => redireciona() }
      >
        <img
          className={ styles.img__card }
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt="foto"
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          {recipe.strMeal ? recipe.strMeal : recipe.strDrink}
        </p>
      </button>
    </div>

  );
}

Card.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

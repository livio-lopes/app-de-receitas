import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ recipe, index }) {
  const location = useLocation();
  const rotaAtual = location.pathname;

  return (
    <div className={ styles.cardImage }>
      <Link to={ `${rotaAtual}/${recipe.idMeal ? recipe.idMeal : recipe.idDrink}` }>
        <div data-testid={ `${index}-recipe-card` } className={ styles.cardImages }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt="foto"
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            {recipe.strMeal ? recipe.strMeal : recipe.strDrink}
          </p>
        </div>
      </Link>
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

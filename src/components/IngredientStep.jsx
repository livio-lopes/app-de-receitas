import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './IngredientStep.module.css';

export default function IngredienteStep(props) {
  const [check, setCheck] = useState(false);
  const { index, ingredient, measure } = props;
  return (

    <label
      className={ check ? styles.complete : undefined }
      data-testid={ `${index}-ingredient-step` }
      htmlFor={ `check-${index}` }
    >
      <input
        type="checkbox"
        id={ `check-${index}` }
        checked={ check }
        onChange={ () => setCheck(!check) }
      />

      {`${ingredient} ${measure}`}

    </label>

  );
}

IngredienteStep.propTypes = {
  index: PropTypes.string,
  ingredient: PropTypes.string,
  measure: PropTypes.string,
}.isRequired;

import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function IngredienteStep(props) {
  const [check, setCheck] = useState(false);
  const { index, ingredient, measure } = props;
  return (
    <div>
      <label
        data-testid={ `${index}-ingredient-step` }
        htmlFor="check"
      >
        <input
          type="checkbox"
          name="check"
          value={ check }
          onChange={ () => setCheck(!check) }
        />
        <span>{`${ingredient} ${measure}`}</span>
      </label>
    </div>
  );
}

IngredienteStep.propTypes = {
  index: PropTypes.string,
  ingredient: PropTypes.string,
  measure: PropTypes.string,
}.isRequired;

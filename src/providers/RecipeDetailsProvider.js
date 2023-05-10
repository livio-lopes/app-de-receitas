import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';

export const RecipeDetailsContext = createContext();

export function RecipeDetailsProvider({ children }) {
  const [objectDetails, setObjectDetails] = useState({});

  const values = useMemo(() => ({
    objectDetails,
    setObjectDetails,
  }), [objectDetails]);

  return (
    <RecipeDetailsContext.Provider value={ values }>
      <div>{children}</div>
    </RecipeDetailsContext.Provider>
  );
}

RecipeDetailsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

import PropTypes from 'prop-types';
import React, { createContext } from 'react';

export const AppContext = createContext();

const INITIAL_STATE = {};

export function AppProvider({ children }) {
  return (
    <AppContext.Provider value={ INITIAL_STATE }>
      <div>{children}</div>
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

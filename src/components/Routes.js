import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipeDetails from '../pages/RecipeDetails';

export default function Routes() {
  const idDaReceitaDrinks = 178319;
  const idDaReceitaMeals = 52771;
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path={ `/meals/${idDaReceitaMeals}` } component={ RecipeDetails } />
      <Route exact path={ `/drinks/${idDaReceitaDrinks}` } component={ RecipeDetails } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

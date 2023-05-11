import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState({});
  const [isMeals, setIsMeals] = useState(true);
  const { recipeId } = useParams();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('meals')) {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          setIsMeals(true);
          setRecipe(data.meals[0]);
        });
    }
    if (location.pathname.includes('drinks')) {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          setIsMeals(false);
          setRecipe(data.drinks[0]);
        });
    }
  }, [setRecipe, recipeId, location.pathname]);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ isMeals ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ isMeals ? recipe.strMeal : recipe.strDrink }
      />

      <h2 data-testid="recipe-title">{isMeals ? recipe.strMeal : recipe.strDrink}</h2>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share

      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite

      </button>
      <p data-testid="recipe-category">
        {recipe.strTags}
      </p>
      <p data-testid="instructions">
        {recipe.strInstructions}
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe

      </button>
    </div>
  );
}

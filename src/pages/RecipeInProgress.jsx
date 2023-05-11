import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { arrlen20, arrlen15 } from '../util/arrAux';
import IngredientStep from '../components/IngredientStep';
import styles from './RecipeInProgress.module.css';

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState({});
  const [listIngredients, setListIngredients] = useState([]);
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
          setListIngredients(arrlen20);
        });
    }
    if (location.pathname.includes('drinks')) {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          setIsMeals(false);
          setRecipe(data.drinks[0]);
          setListIngredients(arrlen15);
        });
    }
  }, [setRecipe, recipeId, location.pathname]);
  return (
    <div>
      <img
        className={ styles.img }
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
      <div className={ styles.bode }>
        {listIngredients.map((item, index) => {
          const ingredient = `strIngredient${item}`;
          const measure = `strMeasure${item}`;
          return recipe[ingredient]
          && (
            <IngredientStep
              index={ index }
              ingredient={ recipe[ingredient] }
              measure={ recipe[measure] }
            />

          );
        })}
      </div>

      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe

      </button>

    </div>
  );
}

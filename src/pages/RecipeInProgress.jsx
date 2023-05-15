import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { arrlen20, arrlen15 } from '../util/arrAux';
import IngredientStep from '../components/IngredientStep';
import styles from './RecipeInProgress.module.css';

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState({});
  const [typeRecipe, setTypeRecipe] = useState('');
  const [listIngredients, setListIngredients] = useState([]);
  const [isMeals, setIsMeals] = useState(true);
  const [totalProgress, setTotalProgress] = useState(0);
  const [statusRecipe, setStatusRecipe] = useState(false);
  const { recipeId } = useParams();
  const location = useLocation();

  const haveProgress = (type, typeId, index) => {
    const id = typeId ? recipe.idMeal : recipe.idDrink;
    const noProgress = false;
    return localStorage.getItem('inProgressRecipes') ? () => {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const listProgress = progress[type][id].some((item) => item === index);
      return listProgress;
    } : noProgress;
  };

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      fetch(URL).then((response) => response.json()).then((data) => {
        setIsMeals(true);
        setRecipe(data.meals[0]);
        setListIngredients(arrlen20);
        setTypeRecipe('meals');
        setTotalProgress(arrlen20
          .map((item) => recipe[`strIngredient${item}`])
          .filter((item) => item).length);
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
          setTypeRecipe('drinks');
          setTotalProgress(arrlen15
            .map((item) => recipe[`strIngredient${item}`])
            .filter((item) => item).length);
        });
    }
  }, [setRecipe, recipeId, location.pathname, recipe]);

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
        {`${recipe.strInstructions}`}
      </p>
      <div className={ styles.container__ingredients }>
        {listIngredients.map((item, index) => {
          const ingredient = `strIngredient${item}`;
          const measure = `strMeasure${item}`;
          return recipe[ingredient]
          && (
            <IngredientStep
              key={ index }
              type={ typeRecipe }
              id={ isMeals ? recipe.idMeal : recipe.idDrink }
              haveProgress={ haveProgress(typeRecipe, isMeals, index) }
              index={ index }
              totalProgress={ totalProgress }
              setStatusRecipe={ setStatusRecipe }
              ingredient={ recipe[ingredient] }
              measure={ recipe[measure] }
            />

          );
        })}
      </div>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !statusRecipe }
      >
        Finish Recipe

      </button>

    </div>
  );
}

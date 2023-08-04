import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ShareAndFavoriteBtns from '../components/ShareAndFavoriteBtns';
import YoutubeEmbed from '../components/YoutubeEmbed';
import CarouselRecommendations from '../components/CarouselRecommendations';
import { RecipeDetailsContext } from '../providers/RecipeDetailsProvider';
import styles from './RecipeDetails.module.css';

export default function RecipeDetails() {
  const [recipeDone, setRecipeDone] = useState(false);

  const {
    imageSource,
    title,
    categoryText,
    instructionsText,
    youtubeVideoID,
    ingredients,
    mensures,
    objectDetails,
    setMealObject,
    setDrinkObject,
    alcoholic,
    colectMealData,
    colectDrinkData,
    startButton,
    setStartButton,
  } = useContext(RecipeDetailsContext);

  const location = useLocation();
  const history = useHistory();
  const actualPath = location.pathname;
  const IDs = actualPath.replace(/\D/g, '');

  const chooseAPI = useCallback(() => {
    if (actualPath.includes('/meals')) {
      colectMealData(IDs);
      setMealObject();
    }

    if (actualPath.includes('/drinks')) {
      colectDrinkData(IDs);
      setDrinkObject();
    }
  }, [actualPath,
    setMealObject,
    setDrinkObject,
    colectMealData,
    colectDrinkData,
    IDs,
  ]);

  const checkDoneLocalStorage = useCallback(() => {
    const getArrayStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getArrayStorage) {
      const Boolean = getArrayStorage.some((object) => (object.id === IDs));

      if (Boolean) {
        setRecipeDone(true);
      } else {
        setRecipeDone(false);
      }
    }
  }, [IDs]);

  const checkInProgressLocalStorage = useCallback(() => {
    const getObjectInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (actualPath.includes('/meals') && getObjectInProgress
    && Object.keys(getObjectInProgress.meals).includes(IDs)) {
      setStartButton('Continue Recipe');
    }
    if (actualPath.includes('/drinks') && getObjectInProgress
    && Object.keys(getObjectInProgress.drinks).includes(IDs)) {
      setStartButton('Continue Recipe');
    }
  }, [setStartButton, IDs, actualPath]);

  useEffect(() => {
    chooseAPI();
  }, [chooseAPI]);

  useEffect(() => {
    checkDoneLocalStorage();
    checkInProgressLocalStorage();
  }, [checkInProgressLocalStorage, checkDoneLocalStorage]);

  return (
    <div className={ styles.container__recipeDetails }>
      <div className={ styles.container__header }>
        <img
          className={ styles.recipe__photo }
          data-testid="recipe-photo"
          src={ imageSource }
          alt="bebida img"
        />
        <div className={ styles.container__btsTitle }>
          <div className={ styles.container__title }>
            <h2 data-testid="recipe-title">{ title }</h2>
            {
              alcoholic
                ? (<h3 data-testid="recipe-category">{ alcoholic }</h3>)
                : (<h3 data-testid="recipe-category">{ categoryText }</h3>)
            }
          </div>
          <ShareAndFavoriteBtns
            recipe={ objectDetails }
          />
        </div>
      </div>
      <div className={ styles.container__ingredients }>
        <h3>Ingredients</h3>
        <ul>
          {
            ingredients.length > 0 && ingredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient + index }
              >
                {`${ingredient} ${mensures[index]}`}
              </li>
            ))
          }
        </ul>
      </div>
      <div className={ styles.container__instructions }>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ instructionsText }</p>
      </div>
      {
        youtubeVideoID && (<YoutubeEmbed embedId={ youtubeVideoID } />)
      }
      <CarouselRecommendations />
      {
        !recipeDone && (
          <button
            className={ styles.btn__start }
            data-testid="start-recipe-btn"
            onClick={ () => { history.push(`${actualPath}/in-progress`); } }
          >
            { startButton }
          </button>)
      }
    </div>
  );
}

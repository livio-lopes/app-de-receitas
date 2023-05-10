import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ShareAndFavoriteBtns from '../components/ShareAndFavoriteBtns';
import YoutubeEmbed from '../components/YoutubeEmbed';
import useFetch from '../hooks/useFetch';
import useGetIngredients from '../hooks/useGetIngredients';

export default function RecipeDetails() {
  const {
    getIngredients,
    ingredients,
    mensures,
  } = useGetIngredients();

  const {
    imageSource,
    title,
    categoryText,
    instructionsText,
    youtubeVideoID,
    alcoholic,
    fetchData,
  } = useFetch();
  // console.log(title);

  const colectDrinkData = async () => {
    const idDrink = 178319;
    const DRINKSURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    // Bebidas
    const data = await fetchData(DRINKSURL);
    console.log(data);
    // coletar ingredientes da api de carnes
    await getIngredients();
  };

  const colectMealData = async () => {
    const idMeal = 52771;
    const MEALURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    // Comidas
    const data = await fetchData(MEALURL);
    console.log(data);
    // coletar ingredientes da api de carnes
    await getIngredients();
  };

  const setMealObject = useCallback(() => {
    const objectMeal = [{ // aqui deve ter um array de objeto
      idFood,
      title,
      imageSource,
      categoryText,
      instructionsText,
      youtubeVideoID,
      nationality,
    }];
    setObjectDetails(objectMeal);
  }, [
    idFood,
    title,
    imageSource,
    categoryText,
    instructionsText,
    youtubeVideoID,
    nationality,
    setObjectDetails,
  ]);

  const setDrinkObject = useCallback(() => {
    const drinkObject = [{ // aqui deve ter um array de objeto
      idFood,
      title,
      imageSource,
      categoryText,
      instructionsText,
      youtubeVideoID,
      alcoholic,
    }];
    setObjectDetails(drinkObject);
  }, [
    idFood,
    title,
    imageSource,
    categoryText,
    instructionsText,
    youtubeVideoID,
    alcoholic,
    setObjectDetails,
  ]);

  const location = useLocation();
  const actualPath = location.pathname;
  // const pathname = "/meals/52771";
  // const numeros = pathname.replace(/\D/g, "");

  const chooseAPI = useCallback(() => {
    if (actualPath.includes('/meals')) {
      colectMealData();
      setMealObject();
      console.log('mealdata chamado');
    }

    if (actualPath.includes('/drinks')) {
      colectDrinkData();
      setDrinkObject();
      console.log('drinkdata chamado');
    }
  }, [actualPath, setMealObject, setDrinkObject]);

  useEffect(() => {
    chooseAPI();
  }, [chooseAPI]);

  return (
    <div className="tb">
      <h1>Tela de Detalhes Receitas</h1>
      <ShareAndFavoriteBtns />

      <img data-testid="recipe-photo" src={ imageSource } alt="bebida img" />
      <h2 data-testid="recipe-title">
        { title }
      </h2>
      {
        categoryText
          ? (
            <p data-testid="recipe-category">
              { categoryText }
            </p>
          )
          : (
            <p data-testid="recipe-category">
              { alcoholic }
            </p>
          )
      }
      <p data-testid="recipe-category">
        { categoryText }
      </p>
      {
        ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ ingredient + index }
          >
            {ingredient}
          </p>
        ))
      }
      {
        mensures.length > 0 && mensures.map((mensure, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ mensure + index }
          >
            { mensure }
          </p>
        ))
      }
      <p data-testid="instructions">
        { instructionsText }
      </p>
      {
        youtubeVideoID && (
          <YoutubeEmbed
            embedId={ youtubeVideoID }
          />
        )
      }
      <CarouselRecommendations />
      <button
        data-testid="start-recipe-btn"
        className="fixedButton"
      >
        Start Recipe
      </button>
    </div>
  );
}

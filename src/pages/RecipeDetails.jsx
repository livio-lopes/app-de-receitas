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

  const recommendationMeals = async () => {
    const baseURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    try {
      const results = await fetch(baseURL);
      const dataMeals = await results.json();
      console.log(dataMeals);
    } catch (error) {
      console.log(error);
    }
  };

  const recommendationDrinks = async () => {
    const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    try {
      const results = await fetch(baseURL);
      const dataDrinks = await results.json();
      console.log(dataDrinks);
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();
  const actualPath = location.pathname;

  const chooseAPI = useCallback(() => {
    if (actualPath.includes('/meals')) {
      colectMealData();
      recommendationDrinks();
      console.log('mealdata');
    }

    if (actualPath.includes('/drinks')) {
      colectDrinkData();
      recommendationMeals();
      console.log('drinkdata');
    }
  }, [actualPath]);

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
      <button
        onClick={ colectMealData }
      >
        trigger test comida
      </button>
      <button
        onClick={ colectDrinkData }
      >
        trigger test bebidas
      </button>
    </div>
  );
}

import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShareAndFavoriteBtns from '../components/ShareAndFavoriteBtns';
import YoutubeEmbed from '../components/YoutubeEmbed';
import CarouselRecommendations from '../components/CarouselRecommendations';

import './style/fixedButton.css';

export default function RecipeDetails() {
  const [imageSource, setImageSource] = useState('');
  const [title, setTitle] = useState('');
  const [categoryText, setCategoryText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [youtubeVideoID, setYoutubeVideoID] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [mensures, setMensures] = useState([]);
  const [alcoholic, setAlcoholic] = useState('');

  const colectDrinkData = async () => {
    const idDrink = 178319;
    const DRINKSURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    try {
      // Bebidas
      const resultsDrinks = await fetch(DRINKSURL);
      const dataDrinks = await resultsDrinks.json();
      if (dataDrinks.drinks === null) {
        console.log('sem bebidas nesse id');
        return;
      }
      if (dataDrinks.drinks !== null) {
        console.log('bebida nesse id:', dataDrinks.drinks[0]);
        const {
          strDrinkThumb,
          strDrink,
          strAlcoholic,
          strInstructions,
        } = dataDrinks.drinks[0];
        setImageSource(strDrinkThumb);
        setTitle(strDrink);
        setAlcoholic(strAlcoholic);
        setInstructionsText(strInstructions);

        // coletar ingredientes da api de carnes
        const limitAPI = 15;
        const arrayIngredients = [];
        const arrayMensures = [];
        for (let i = 1; i <= limitAPI; i += 1) {
          const keyIngredients = `strIngredient${i}`;
          const keyMensures = `strMeasure${i}`;
          if (dataDrinks.drinks[0][keyIngredients]) {
            arrayIngredients.push(dataDrinks.drinks[0][keyIngredients]);
            arrayMensures.push(dataDrinks.drinks[0][keyMensures]);
          }
        }
        setIngredients(arrayIngredients);
        setMensures(arrayMensures);
      }
    } catch (error) {
      console.log('sem bebidas nesse id', error);
    }
  };

  const colectMealData = async () => {
    const idMeal = 52771;
    const MEALURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try {
      // Comidas
      const resultsFoods = await fetch(MEALURL);
      const dataFoods = await resultsFoods.json();
      if (dataFoods.meals === null) {
        console.log('sem comida nesse id');
        return;
      }
      if (dataFoods.meals !== null) {
        console.log('comida nesse id:', dataFoods.meals[0]);
        const {
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
          strYoutube,
        } = dataFoods.meals[0];
        setImageSource(strMealThumb);
        setTitle(strMeal);
        setCategoryText(strCategory);
        setInstructionsText(strInstructions);

        // id dos videos do youtube
        const regex = /v=([^&]+)/;
        const match = strYoutube.match(regex);
        const videoId = match[1];
        setYoutubeVideoID(videoId);

        // coletar ingredientes da api de carnes
        const limitAPI = 20;
        const arrayIngredients = [];
        const arrayMensures = [];
        for (let i = 1; i <= limitAPI; i += 1) {
          const keyIngredients = `strIngredient${i}`;
          const keyMensures = `strMeasure${i}`;
          if (dataFoods.meals[0][keyIngredients]) {
            arrayIngredients.push(dataFoods.meals[0][keyIngredients]);
            arrayMensures.push(dataFoods.meals[0][keyMensures]);
          }
        }
        setIngredients(arrayIngredients);
        setMensures(arrayMensures);
      }
    } catch (error) {
      console.log('caiu no catch', error);
    }
  };

  const location = useLocation();
  const actualPath = location.pathname;

  const chooseAPI = useCallback(() => {
    if (actualPath.includes('/meals')) {
      colectMealData();
      console.log('mealdata');
    }

    if (actualPath.includes('/drinks')) {
      colectDrinkData();
      console.log('drinkdata');
    }
  }, [actualPath]);

  useEffect(() => {
    chooseAPI();
  }, [chooseAPI]);

  return (
    <div>
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

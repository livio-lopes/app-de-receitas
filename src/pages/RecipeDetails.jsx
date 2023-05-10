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
  const [idFood, setIdFood] = useState();
  const [nationality, setNationality] = useState('');
  const [objectDetails, setObjectDetails] = useState({});

  const colectDrinkData = async () => {
    const idCyPress = 178319;
    const DRINKSURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idCyPress}`;
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
          idDrink,
          strCategory,
        } = dataDrinks.drinks[0];
        setCategoryText(strCategory);
        setIdFood(idDrink);
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
    const idCyPress = 52771;
    const MEALURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idCyPress}`;
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
        const { strMealThumb, strMeal, strCategory, strInstructions,
          strYoutube, idMeal, strArea } = dataFoods.meals[0];
        setIdFood(idMeal);
        setNationality(strArea);
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
      <ShareAndFavoriteBtns
        recipe={ objectDetails }
      />

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

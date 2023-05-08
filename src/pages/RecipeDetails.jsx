import React, { useEffect } from 'react';
import ShareAndFavoriteBtns from '../components/ShareAndFavoriteBtns';

export default function RecipeDetails() {
  const searchApiDrinks = async () => {
    const idDrink = 178319;
    const DRINKSURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    try {
      // Bebidas
      const resultsDrinks = await fetch(DRINKSURL);
      const dataDrinks = await resultsDrinks.json();
      console.log(dataDrinks);
    } catch (error) {
      console.log(error);
    }
  };

  const searchApiMeal = async () => {
    const idMeal = 52771;
    const MEALURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try {
      // Comidas
      const resultsFoods = await fetch(MEALURL);
      const dataFoods = await resultsFoods.json();
      console.log(dataFoods);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchApiDrinks();
    searchApiMeal();
  }, []);

  return (
    <div>
      <h1>Tela de Detalhes Receitas</h1>
      <button
        onClick={ searchApiMeal }
      >
        trigger test comida
      </button>
      <button
        onClick={ searchApiDrinks }
      >
        trigger test bebidas
      </button>
      <ShareAndFavoriteBtns />
    </div>
  );
}

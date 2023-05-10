import { useState } from 'react';

const useFetch = () => {
  const [imageSource, setImageSource] = useState('');
  const [title, setTitle] = useState('');
  const [categoryText, setCategoryText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [youtubeVideoID, setYoutubeVideoID] = useState('');
  const [alcoholic, setAlcoholic] = useState('');
  const [id, setId] = useState('');
  const [nationality, setNationality] = useState('');

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const { drinks, meals } = data;

      if (drinks) {
        // lógica do drink
        const {
          strDrinkThumb,
          strDrink,
          strAlcoholic,
          strInstructions,
          idDrink,
        } = drinks[0];
        setImageSource(strDrinkThumb);
        setTitle(strDrink);
        setAlcoholic(strAlcoholic);
        setInstructionsText(strInstructions);
        setId(idDrink);

        return drinks[0];
      }
      if (meals) {
        // lógica da comida
        const {
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
          strYoutube,
          idMeal,
          strArea,
        } = meals[0];
        setImageSource(strMealThumb);
        setTitle(strMeal);
        setCategoryText(strCategory);
        setInstructionsText(strInstructions);
        setId(idMeal);
        setNationality(strArea);

        const regex = /v=([^&]+)/;
        const match = strYoutube.match(regex);
        const videoId = match[1];
        setYoutubeVideoID(videoId);

        return meals[0];
      }
    } catch (erro) {
      throw new Error(erro);
    }
  };

  return {
    id,
    imageSource,
    title,
    categoryText,
    instructionsText,
    youtubeVideoID,
    alcoholic,
    nationality,
    fetchData,
  };
};

export default useFetch;

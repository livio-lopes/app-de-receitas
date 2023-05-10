import { useState } from 'react';
import useFetch from './useFetch';

const useGetIngredients = () => {
  const { fetchData } = useFetch();
  const [ingredients, setIngredients] = useState([]);
  const [mensures, setMensures] = useState([]);

  const getIngredients = async (url, APILimit) => {
    const data = await fetchData(url);

    const arrayIngredients = [];
    const arrayMensures = [];

    for (let i = 1; i <= APILimit; i += 1) {
      const keyIngredients = `strIngredient${i}`;
      const keyMensures = `strMeasure${i}`;
      if (data[keyIngredients]) {
        arrayIngredients.push(data[keyIngredients]);
        arrayMensures.push(data[keyMensures]);
      }
    }
    setIngredients(arrayIngredients);
    setMensures(arrayMensures);
  };

  return {
    getIngredients,
    ingredients,
    mensures,
  };
};

export default useGetIngredients;

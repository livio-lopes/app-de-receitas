export const fetchDataIngredient = async (ingredient) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await data.json();
  return result;
};

export const fetchDataNameSearch = async (name) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const result = await data.json();
  return result;
};

export const fetchDataFirstLetter = async (firstLetter) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const result = await data.json();
  return result;
};

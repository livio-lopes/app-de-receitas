const fetchData = async (ingredient) => {
  const dataIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const result = await dataIngredients.json();
  return result;
};
export default fetchData;

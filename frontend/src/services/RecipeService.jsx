import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getRecipes = async (filters) => {
  try {
    const response = await axios.get(BACKEND_URL + "/recipes/");
    if (!response.data) {
      throw new Error("No data from backend");
    }
    const recipes = response.data;
    console.log(recipes);
    const filteredRecipes = recipes.filter((recipe) => {
      return (
        // TODO Filter feature is implemented, but preparation time, calorie count and cooking time are supported
        //      by the database because it does not have this value.
        filters.prepTimeValues[0] <= recipe.pricePerServing &&
        recipe.pricePerServing <= filters.prepTimeValues[1]
      );
    });
    console.log(filteredRecipes);
    return filteredRecipes;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

const getRecipeByID = async (id) => {
  try {
    const response = await axios.get(BACKEND_URL + `/recipes/${id}`);
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export { getRecipes, getRecipeByID };

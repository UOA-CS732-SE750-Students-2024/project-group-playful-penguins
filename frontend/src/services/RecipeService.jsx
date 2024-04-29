import axios from "axios";
import { FILTERS } from "../constants/styles-constant";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getRecipes = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/recipes/");
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

const getFilteredRecipes = async (filters) => {
  try {
    let url = `${BACKEND_URL}/recipes/filter`;

    if (
      filters[FILTERS.DIET_REQUIREMENT.STATE_KEY] !==
      FILTERS.DIET_REQUIREMENT.INITIAL_VALUE
    ) {
      url += `?dietRequirement=${filters[FILTERS.DIET_REQUIREMENT.STATE_KEY]}`;
    }
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("No data from backend");
    }
    const recipes = response.data;
    const filteredRecipes = recipes.filter((recipe) => {
      return (
        // TODO Filter feature is implemented, but preparation time, calorie count and cooking time are supported
        //      by the database because it does not have this value.
        filters.prepTimeValues[0] <= recipe.pricePerServing &&
        recipe.pricePerServing <= filters.prepTimeValues[1]
      );
    });
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

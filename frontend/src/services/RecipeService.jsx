import axios from "axios";
import { getSortQuery } from "./getQuery/getSortQuery";
import { getFilterQuery } from "./getQuery/getFilterQuery";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getRecipes = async (selectedSortByOption) => {
  try {
    const sortQuery = getSortQuery(selectedSortByOption);
    const url = `${BACKEND_URL}/recipes?${sortQuery}`;
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error("No data from backend");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

const getFilteredRecipes = async (filters, selectedSortByOption) => {
  try {
    const filterQuery = getFilterQuery(filters);
    const sortQuery = getSortQuery(selectedSortByOption);
    const url = `${BACKEND_URL}/recipes/filter?${filterQuery}&${sortQuery}`;

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

export { getRecipes, getRecipeByID, getFilteredRecipes };

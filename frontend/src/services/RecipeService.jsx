import axios from "axios";
import { getSortQuery } from "./getQuery/getSortQuery";
import { getRecipeFilterQuery } from "./getQuery/getRecipeFilterQuery";
import { getSearchQuery } from "./getQuery/getSearchQuery";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getMatchedRecipes = async (searchTerm, selectedSortByOption) => {
  try {
    let query = getSearchQuery(searchTerm);
    query += "&" + getSortQuery(selectedSortByOption);
    const url = `${BACKEND_URL}/recipes/match-recipes/query?${query}`;
    const response = await axios.get(url);
    console.log(url);
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data.recipes;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

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

// const getFilteredRecipes = async (filters, selectedSortByOption) => {
//   try {
//     const filterQuery = getRecipeFilterQuery(filters);
//     const sortQuery = getSortQuery(selectedSortByOption);
//     const url = `${BACKEND_URL}/recipes/filter?${filterQuery}&${sortQuery}`;
//     console.log(url);

//     const response = await axios.get(url);
//     if (!response.data) {
//       throw new Error("No data from backend");
//     }
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//     return [];
//   }
// };

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

export { getRecipes, getRecipeByID, getMatchedRecipes };

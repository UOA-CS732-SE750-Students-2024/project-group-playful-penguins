import axios from "axios";
import { getSortQuery } from "./get-recipe-queries/getSortQuery";
import { getRecipeFilterQuery } from "./get-recipe-queries/getRecipeFilterQuery";
import { getSearchQuery } from "./get-recipe-queries/getSearchQuery";
import { getTakeoutFilterQuery } from "./get-takeout-queries/getTakeoutFilterQuery";
import { getFavoritesQuery } from "./get-recipe-queries/getFavoritesQuery";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getMatchedRecipes = async (
  searchTerm,
  selectedSortByOption,
  filters,
  favoritesSelection,
  access_token
) => {
  try {
    let query = getSearchQuery(searchTerm);
    query += "&" + getSortQuery(selectedSortByOption);
    query += "&" + getRecipeFilterQuery(filters);
    query += "&" + getFavoritesQuery(favoritesSelection);

    const url = `${BACKEND_URL}/recipes/match-recipes?${query}`;
    const response = await axios.get(url, {
      headers: { Authorization: access_token },
    });
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return (response.data = response.data.recipes);
  } catch (error) {
    console.error("Error fetching data: ", error);
    if (error.response && error.response.status === 401) {
      return { status: 401, error };
    }
    return [];
  }
};

const getMatchedTakeouts = async (
  searchTerm,
  selectedSortByOption,
  filters,
  favoritesSelection
) => {
  try {
    let query = getSearchQuery(searchTerm);
    query += "&" + getSortQuery(selectedSortByOption);
    query += "&" + getTakeoutFilterQuery(filters);
    query += "&" + getFavoritesQuery(favoritesSelection);

    const url = `${BACKEND_URL}/takeouts/match-takeouts?${query}`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data.takeouts;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

const getRecipes = async (selectedSortByOption) => {
  try {
    const sortQuery = getSortQuery(selectedSortByOption);
    const url = `${BACKEND_URL}/recipes?${sortQuery}`;
    const response = await axios.get(url, {
      headers: { Authorization: access_token },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    if (error.response) {
      if (error.response.status === 401) return { status: 401, error };
    }
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

export { getRecipes, getRecipeByID, getMatchedRecipes, getMatchedTakeouts };

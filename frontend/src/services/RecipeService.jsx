import axios from "axios";
import { getSortQuery } from "./getQuery/getSortQuery";
import { getRecipeFilterQuery } from "./getQuery/getRecipeFilterQuery";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getRecipes = async (searchTerm, selectedSortByOption) => {
  let url = `${BACKEND_URL}/recipes/`;
  let query = "";
  try {
    if (selectedSortByOption) {
      const sortQuery = getSortQuery(selectedSortByOption);
      if (sortQuery) query += `${sortQuery}&`;
    }

    if (searchTerm && searchTerm.length) {
      query += `title=${searchTerm}`;
    }

    if (query !== "") {
      url += "search/q?";
    }

    console.log(url + query);

    const response = await axios.get(url + query);

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
    const filterQuery = getRecipeFilterQuery(filters);
    const sortQuery = getSortQuery(selectedSortByOption);
    const url = `${BACKEND_URL}/recipes/filter?${filterQuery}&${sortQuery}`;
    console.log(url);

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

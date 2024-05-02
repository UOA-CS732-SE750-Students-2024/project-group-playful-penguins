import axios from "axios";
import { getSortQuery } from "./getQuery/getSortQuery";
import { getTakeoutFilterQuery } from "./getQuery/getTakeoutFilterQuery";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getTakeouts = async (searchTerm, selectedSortByOption) => {
  let url = `${BACKEND_URL}/takeouts/`;
  let query = "";
  try {
    if (selectedSortByOption) {
      const sortQuery = getSortQuery(selectedSortByOption);
      if (sortQuery) query += `${sortQuery}&`;
    }

    if (searchTerm && searchTerm.length > 1) {
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
  }
};

const getFilteredTakeouts = async (filters, selectedSortByOption) => {
  try {
    const filterQuery = getTakeoutFilterQuery(filters);
    const sortQuery = getSortQuery(selectedSortByOption);
    const url = `${BACKEND_URL}/takeouts/filter?${filterQuery}&${sortQuery}`;
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

export default { getTakeouts, getFilteredTakeouts };

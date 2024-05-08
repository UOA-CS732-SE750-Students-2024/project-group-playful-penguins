import axios from "axios";
import { getSearchQuery } from "./get-queries/getSearchQuery";
import { getSortQuery } from "./get-queries/getSortQuery";
import { getFilterQuery } from "./get-queries/getFilterQuery";
import { getFavoritesQuery } from "./get-queries/getFavoritesQuery";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getMatchedTakeouts = async (
  searchTerm,
  selectedSortByOption,
  filters,
  favoritesSelection,
  access_token
) => {
  try {
    let query = getSearchQuery(searchTerm);
    query += "&" + getSortQuery(selectedSortByOption);
    query += "&" + getFilterQuery(filters);
    query += "&" + getFavoritesQuery(favoritesSelection);

    const url = `${BACKEND_URL}/takeouts/match-takeouts?${query}`;
    const response = await axios.get(url, {
      headers: { Authorization: access_token },
    });
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data.takeouts;
  } catch (error) {
    console.error("Error fetching data: ", error);
    if (error.response && error.response.status === 401) {
      return { status: 401, error };
    }
    return [];
  }
};

export { getMatchedTakeouts };

import axios from "axios";

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

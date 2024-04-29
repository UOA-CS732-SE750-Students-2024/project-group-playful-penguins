import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api";

const getTakeouts = async (queryParams) => {
  try {
    let queryBuilder = BACKEND_URL + "/takeouts/";
    let response = null;
    if (Object.keys(queryParams).length > 0) {
      queryBuilder += "search/q?";
      for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          if (Array.isArray(queryParams[key])) {
            for (const value of queryParams[key]) {
              if (value != null && value != "") {
                console.log("key : " + key);
                console.log("value : " + value);
                queryBuilder += `${key}=${encodeURIComponent(value)}&`;
              }
            }
          } else {
            queryBuilder += `${key}=${encodeURIComponent(queryParams[key])}&`;
          }
        }
      }
      queryBuilder = queryBuilder.slice(0, -1);
    }
    console.log(queryBuilder);
    response = await axios.get(
      queryBuilder
      // BACKEND_URL + "/takeouts/search?dish_name=" + searchTerm
    );

    if (!response.data) {
      console.error("Error fetching data: ", error);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const getTakeoutByID = async (id) => {
  if (!id) return;
  try {
    const response = await axios.get(BACKEND_URL + `/takeouts/${id}`);
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export default { getTakeouts, getTakeoutByID };

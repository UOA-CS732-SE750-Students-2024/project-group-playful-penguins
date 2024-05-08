import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const authenticateGoogleUser = async (codeResponse) => {
  try {
    const response = await axios.post(BACKEND_URL + `/user/auth/google`, {
      code: codeResponse.code,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/signup`, {
      name: name,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during signup:", formatErrorMessage(error));
    throw new Error(formatErrorMessage(error));
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/login`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", formatErrorMessage(error));
    throw new Error(formatErrorMessage(error));
  }
};

function formatErrorMessage(error) {
  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error; // Assuming error details are in error.response.data.error
  } else if (error.message) {
    return error.message;
  } else {
    return "Unknown error occurred";
  }
}

const getFavoriteIds = async (email, access_token) => {
  try {
    const url = `${BACKEND_URL}/user/favorites/get`;
    const response = await axios.get(url, {
      headers: { Authorization: access_token },
      params: { email },
    });
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    if (error.response && error.response.status === 401) {
      return { status: 401, error };
    }
    return [];
  }
};

const updateFavRecipeID = async (email, selectedRecipeID, access_token) => {
  try {
    const url = `${BACKEND_URL}/user/favorites/updaterecipe`;
    const response = await axios.post(
      url,
      { recipeID: selectedRecipeID },
      {
        headers: { Authorization: access_token },
        params: { email },
      }
    );
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data.ids;
  } catch (error) {
    console.error("Error fetching data: ", error);
    if (error.response && error.response.status === 401) {
      return { status: 401, error };
    }
    return [];
  }
};

const removeFavRecipeID = async (email, selectedRecipeID, access_token) => {
  try {
    const url = `${BACKEND_URL}/user/favorites/removerecipe`;
    const response = await axios.post(
      url,
      { recipeID: selectedRecipeID },
      {
        headers: { Authorization: access_token },
        params: { email },
      }
    );
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data.ids;
  } catch (error) {
    console.error("Error fetching data: ", error);
    if (error.response && error.response.status === 401) {
      return { status: 401, error };
    }
    return [];
  }
};

const getFavTakeoutID = async (email, access_token) => {
  try {
    const url = `${BACKEND_URL}/user/favorites/takeout`;
    const response = await axios.get(url, {
      headers: { Authorization: access_token },
      params: { email },
    });
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data.ids;
  } catch (error) {
    console.error("Error fetching data: ", error);
    if (error.response && error.response.status === 401) {
      return { status: 401, error };
    }
    return [];
  }
};

const updateFavTakeoutID = async (email, selectedtakeoutID, access_token) => {
  try {
    const url = `${BACKEND_URL}/user/favorites/updatetakeout`;
    const response = await axios.post(
      url,
      { takeoutID: selectedtakeoutID },
      {
        headers: { Authorization: access_token },
        params: { email },
      }
    );
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data.ids;
  } catch (error) {
    console.error("Error fetching data: ", error);
    if (error.response && error.response.status === 401) {
      return { status: 401, error };
    }
    return [];
  }
};

const removeFavTakeoutID = async (email, selectedtakeoutID, access_token) => {
  try {
    const url = `${BACKEND_URL}/user/favorites/removetakeout`;
    const response = await axios.post(
      url,
      { takeoutID: selectedtakeoutID },
      {
        headers: { Authorization: access_token },
        params: { email },
      }
    );
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data.ids;
  } catch (error) {
    console.error("Error fetching data: ", error);
    if (error.response && error.response.status === 401) {
      return { status: 401, error };
    }
    return [];
  }
};

export {
  signup,
  login,
  authenticateGoogleUser,
  getFavoriteIds,
  updateFavRecipeID,
  removeFavRecipeID,
  getFavTakeoutID,
  updateFavTakeoutID,
  removeFavTakeoutID,
};

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

<<<<<<< Updated upstream
=======
const displayFavoriteRecipe = async (access_token) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/user/favorites/recipe`, {
      headers: { Authorization: access_token },
    });
    console.log("Reached service!!!");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching favorite recipes:",
      formatErrorMessage(error)
    );
    throw new Error(formatErrorMessage(error));
  }
};

>>>>>>> Stashed changes
function formatErrorMessage(error) {
  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error; // Assuming error details are in error.response.data.error
  } else if (error.message) {
    return error.message;
  } else {
    return "Unknown error occurred";
  }
}

export { signup, login, authenticateGoogleUser };

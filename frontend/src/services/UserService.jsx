import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const authenticateGoogleUser = async (codeResponse) => {
  try {
    axios
      .post(BACKEND_URL + `/user/auth/google`, {
        code: codeResponse.code,
      })
      .then((res) => {
        console.log(res);
        return res;
      });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/signup`, {
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
    const token = response.data.user.token; // Extract the token from the response
    console.log(token)
    if (token) {
      localStorage.setItem("userToken", token); // Store the token in localStorage
    } else {
      throw new Error("Token not provided");
    }

    return response.data;
  } catch (error) {
    console.error("Error during login:", formatErrorMessage(error));
    throw new Error(formatErrorMessage(error));
  }
};

const api = axios.create({
  baseURL: BACKEND_URL,
});
// Interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken"); // Adjust this if your token is stored differently
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const displayFavoriteRecipe = async () => {
  try {
    const response = await api.get(`/user/favorites/recipe`);  // Assuming this is the endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite recipes:", formatErrorMessage(error));
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

export { signup, login, authenticateGoogleUser,displayFavoriteRecipe };

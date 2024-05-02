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
    const response = await axios.post(`${BACKEND_URL}/login`, {
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

export { signup, login, authenticateGoogleUser };

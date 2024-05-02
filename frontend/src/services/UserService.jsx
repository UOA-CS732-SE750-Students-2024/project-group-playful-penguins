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
    const response = await axios.post(BACKEND_URL + "/signup", {
      name: name,
      email: email,
      password: password,
    });
    if (!response.data) {
      throw new Error("No data from backend");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// TODO: Login

export { signup, authenticateGoogleUser };

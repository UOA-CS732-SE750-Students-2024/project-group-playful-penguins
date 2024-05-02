import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const authenticateGoogleUser = async (codeResponse) => {
  try {
    axios.post(BACKEND_URL + `/user/auth/google`, {
      code: codeResponse.code,
    }).then((res) => {
        console.log(res)
        return res;
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

export { authenticateGoogleUser };

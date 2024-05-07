import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const extractUser =(token)=>{
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return decoded.email;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const generateAccessToken = (user) => {

  const payload = {
    id: user._id,
    email: user.email,
  };

  const options = { expiresIn: "1h" };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, options);
}

export { verifyAccessToken, generateAccessToken,extractUser };

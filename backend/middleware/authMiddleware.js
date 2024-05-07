import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { jwtDecode } from "jwt-decode";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client();

const verifyAccessToken = async (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.iss === "https://accounts.google.com") {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      console.log(ticket);
      return true;
    } else {
      const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
      return true;
    }
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
    name: user.name,
  };

  const options = { expiresIn: "1h" };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, options);
};

export { verifyAccessToken, generateAccessToken,extractUser };

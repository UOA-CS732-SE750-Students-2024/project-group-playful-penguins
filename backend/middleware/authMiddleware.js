import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return { success: true, data: decoded }
  } catch (error) {
    return { success: false, error: error.message}
  }
}

export { verifyAccessToken };

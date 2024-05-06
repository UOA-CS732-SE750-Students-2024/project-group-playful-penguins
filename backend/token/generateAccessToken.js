import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

function generateAccessToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const secret = process.env.ACCESS_TOKEN_SECRET;
  console.log(secret);
  // TODO: GOOD to have expire time
  //   const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret);
}
export { generateAccessToken };

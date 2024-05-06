import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/userModel.js"
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    
  ) {
    

    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];
     

      // Verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("Decoded Token:", decoded); // Log the decoded information

      req.user = await User.findById(decoded.id).select('-password');  // Excluding password from the fetched data
      req.email = decoded.email;  // Adding email to the request object for access in your routes


      next();
    } catch (error) {
      res.status(401);
      console.log(error);

      // throw new Error("NOT AUTHORIZED");
    }
  }
});

export { protect };

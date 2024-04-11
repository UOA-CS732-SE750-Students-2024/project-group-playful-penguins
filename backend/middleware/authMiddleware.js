import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      next();
    } catch (error) {
      res.status(401);
      throw new Error("NOT AUTHORIZED");
    }
  }
});

export { protect };

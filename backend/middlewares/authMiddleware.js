import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

export const jwtProtect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decode) {
        req.user = await User.findById(decode._id).select("-password");
        next();
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No authorized, No token");
  }
});

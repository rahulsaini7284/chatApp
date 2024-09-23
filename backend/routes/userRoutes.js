import express from "express";
import {
  authUser,
  getAllUsers,
  registerUser,
} from "../controllers/userController.js";
import { jwtProtect } from "../middlewares/authMiddleware.js";

const userRoute = express();

userRoute.route("/").post(registerUser).get(jwtProtect, getAllUsers);
userRoute.post("/login", authUser);

export default userRoute;

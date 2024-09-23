import express from "express";
import { jwtProtect } from "../middlewares/authMiddleware.js";
import { allMessages, sendMessage } from "../controllers/messageController.js";

const messageRoute = express();

messageRoute.route("/").post(jwtProtect, sendMessage);
messageRoute.route("/:chatId").get(jwtProtect, allMessages);

export default messageRoute;

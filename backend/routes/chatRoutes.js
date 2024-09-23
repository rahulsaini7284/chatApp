import express from "express";
import { jwtProtect } from "../middlewares/authMiddleware.js";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChat,
  leaveGroup,
  removeFromGroup,
  updateGroupName,
} from "../controllers/chatController.js";

const chatRoutes = express();

chatRoutes.route("/").post(jwtProtect, accessChat).get(jwtProtect, fetchChat);
chatRoutes.route("/group").post(jwtProtect, createGroupChat);
chatRoutes.put("/renameGroupName/:id", jwtProtect, updateGroupName);
chatRoutes.put("/addToGroup/:id", jwtProtect, addToGroup);
chatRoutes.put("/removeFromGroup/:id", jwtProtect, removeFromGroup);
chatRoutes.put("/leaveGroup/:id", jwtProtect, leaveGroup);

export default chatRoutes;

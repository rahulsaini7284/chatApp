import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoutes.js";
import { Server } from "socket.io";
import path from "path";

import { errorHandler, notFound } from "./middlewares/errorMiddlerware.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoute from "./routes/messageRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoute);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

//env varibles api-------------------------
app.use("/cloud_name", (req, res) => {
  res.send(process.env.CLOUD_NAME);
});
app.use("/api_secret", (req, res) => {
  res.send(process.env.API_SECRET);
});
app.use("/app_id", (req, res) => {
  res.send(process.env.APPID);
});
app.use("/client_id", (req, res) => {
  res.send(process.env.CLIENTID);
});

app.use(errorHandler);
app.use(notFound);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`.yellow.bold);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData.name);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

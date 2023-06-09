const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
//const { Server } = require("socket.io");
const http = require("http");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
const server = http.createServer(app);
//const io = require("socket.io")(server);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// const io = new Server(server, {
//   cors: {
//     origin: "http://127.0.0.1:27017:5000",
//     methods: ["GET", "POST"],
//   },
// });

//1:create socket connection, it is in tryChat component
io.on("connection", async (socket, err) => {
  console.log(`User Connected: ${socket?.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    //4: receive message from frontend
    console.log("data", data);
    socket.broadcast.emit("receive_message", data); //5:broadcast this message to all the user id connected
  });
});

// io.on("connection")
//   .then((socket) => console.log(`User Connected: ${socket.id}`))
//   .catch((err) => console.log("err", err));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(err));

app.use(userRoutes);

server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

//when you broadcast messages

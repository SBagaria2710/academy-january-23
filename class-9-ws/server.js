const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
// This io is responsible for handling all the socket connections
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected. User's Socket ID: ", socket.id);

  // setInterval(() => {
  //   socket.emit(
  //     "scaler",
  //     `message from server - ${socket.id} at ${new Date()}`
  //   );
  // }, 2000);

  socket.on("client_message", (data) => {
    socket.broadcast.emit("broadcast", data);
  });

  let roomId;
  socket.on("join_room", () => {
    console.log(socket.id + " Joined the room ", roomId);
    socket.join(roomId);
  });

  socket.on("create_grp", (roomId) => {
    console.log("Group is created!", roomId);
    // First Participant
    socket.join(roomId);
  });

  socket.on("grp_msg", (data) => {
    socket.to(room).emit("serv_grp_msg", data);
  });

  // Listen for disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected ", socket.id);
  });
});

server.listen(3000, () => console.log("listening at 3000"));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

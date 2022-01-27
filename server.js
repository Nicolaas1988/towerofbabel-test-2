const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  checkChar,
  deletePlayerTurn,
  userJoin,
  getCurrentUser,
  getPlayerTurn,
  userLeave,
  getRoomUsers,
  nextPlayer,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCord Bot";

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
      section: user.section,
      letters: user.letters,
    });
  }); ///This will solve the playerTurn Issue

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("isPlayerTurnReq", () => {
    const user = getCurrentUser(socket.id);
    let playerTurn = getPlayerTurn(socket.id, user.room);
    socket.emit("isPlayerTurnRes", playerTurn, socket.id);
  });

  socket.on("wordInput", (char) => {
    const user = getCurrentUser(socket.id);

    let isCharAllowed = checkChar(char, socket.id, user.letters);

    io.to(user.room).emit("charChecked", isCharAllowed);

    //io.to(user.room).emit
  });

  //Listens for user clicks

  socket.on("nextPlayerReq", () => {
    const user = getCurrentUser(socket.id);
    nextPlayer(user.room, user.id);
  });

  socket.on("updatedWordsAcrossDOM", (place, word) => {
    const user = getCurrentUser(socket.id);
    socket.to(user.room).emit("updateWords", place, word);
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    const userPlayerTurn = deletePlayerTurn(user.room, socket.id); //added this
    socket.to(user.room).emit("deletedPlayerTurn", userPlayerTurn); // added this

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
        section: user.section,
        letters: user.letters,
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

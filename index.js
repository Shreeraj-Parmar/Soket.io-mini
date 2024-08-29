const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
// Server is a class

const app = express();

app.use(express.static(path.resolve("./public")));
// app.set("view engine", ejs);

// express creates a web server
const server = http.createServer(app); // http.createServer() is creates a http server using express
const io = new Server(server); // setUp socket.io to work with server

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
  //   res.render("./index.ejs");
});

// socket.io

io.on("connection", (socket) => {
  console.log("user is connected", socket.id);

  socket.emit("hello", "hello emit from server");
  socket.on("cl-side", (data) => {
    io.emit("chats", data);
  });

  // handle disconnection:
  socket.on("disconnect", () => {
    console.log("user disconnected  ");
  });
});

//server.listen
server.listen(8080, () => {
  console.log(`app is listening on port 8080 & cluster ${process.pid}`);
});

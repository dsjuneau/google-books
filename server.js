const express = require("express");

const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
//Added comments to test branch
//another comment
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

io.on("connection", socket => {
  console.log("User connected");

  socket.on("newBook", () => {
    io.emit("newBook");
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
//See routes folder
app.use(routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
  useNewUrlParser: true
});

server.listen(PORT, () => {
  console.log(`🌎 ==> API app now on port ${PORT}!`);
});

// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");


// database
const db = require("./config/db");
//load env variables
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3070;

// express app config
// Middleware
app.use(express.json({ limit: "5000kb" })); // LIMIT for JSON
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "5000kb" })); // LIMIT for URL ENCODE (image data)

app.use(express.static(__dirname + "/../client/public"));
app.use(cookieParser());

//Require application Route modules
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const friendRoutes = require("./routes/friends");
const NotificationRoutes = require("./routes/notifications");
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/friend", friendRoutes);
app.use("/notification", NotificationRoutes);
app.use(cors());

const httpServer = createServer(app);
const sio = require("./utils/socket");

sio.init(httpServer, {
  pingTimeout: 60000,
  pingInterval: 60000,
  cors: {
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  },
});

httpServer.listen(PORT, function () {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});

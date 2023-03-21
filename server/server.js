// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const app = express();

const whitelist = [
  'http://127.0.0.1:3000',
  'http://localhost:3000',
];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors((corsOptions)));

// database
const db = require("./config/db");
//load env variables
require("dotenv").config();
const PORT = process.env.PORT || 3070;

// express app config
// Middleware
app.use(express.json({ limit: "5000kb" })); // LIMIT for JSON
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "5000kb" })); // LIMIT for URL ENCODE (image data)
app.use(cookieParser());

//Require application Route modules
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const friendRoutes = require("./routes/friends");
const NotificationRoutes = require("./routes/notifications");
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/friends", friendRoutes);
app.use("/notifications", NotificationRoutes);

const httpServer = createServer(app);
const sio = require("./utils/socket");

sio.init(httpServer, {
  pingTimeout: 60000,
  pingInterval: 60000,
  cors: {
    origin: whitelist,
  },
});

httpServer.listen(PORT, function () {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});

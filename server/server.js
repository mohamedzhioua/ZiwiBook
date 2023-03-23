// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const corsOptions = require ("./utils/corsOptions")
const allowedOrigins = require("./utils/allowedOrigins")
const app = express();


app.use(cors((corsOptions)));

//limiter for posts 
// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000 * 24,
//   max: 20,

//   handler: (request, response, next, options) =>
//     response.status(options.statusCode).json({
//       status: 'fail ',
//       message:
//         'You can only post 15 posts per day and you have reached the limit. You can post again tomorrow, have fun ',
//     }),
// });
// app.use('/api/posts/addPost', limiter);

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
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/notifications", NotificationRoutes);

const httpServer = createServer(app);
const sio = require("./utils/socket");

sio.init(httpServer, {
  pingTimeout: 60000,
  pingInterval: 60000,
  cors: {
    origin: allowedOrigins,
  },
});

httpServer.listen(PORT, function () {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});

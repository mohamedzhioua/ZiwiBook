const path = require('path')
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const connectDB = require("./config/db");
const corsOptions = require ("./utils/corsOptions")
const allowedOrigins = require("./utils/allowedOrigins")
const xss = require('xss-clean');

const app = express();

// connectDB()
app.use(cors((corsOptions)));

//load env variables
require("dotenv").config();
const PORT = process.env.PORT || 3070;

// express app config
// Middleware
app.use(express.json({ limit: "5000kb" })); // LIMIT for JSON
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "5000kb" })); // LIMIT for URL ENCODE (image data)
app.use(cookieParser());
// Add the xss-clean middleware to all routes
app.use(xss());

// app.use('/', express.static(path.join(__dirname, 'public')))

//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/posts",  require("./routes/posts"));
app.use("/api/friends", require("./routes/friends"));
app.use("/api/notifications", require("./routes/notifications"));

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
      res.json({ message: '404 Not Found' })
  } else {
      res.type('txt').send('404 Not Found')
  }
})


const httpServer = createServer(app);
const sio = require("./utils/socket");

sio.init(httpServer, {
  pingTimeout: 60000,
  pingInterval: 60000,
  cors: {
    origin: allowedOrigins,
  },
});

const server = httpServer.listen(PORT, function () {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});

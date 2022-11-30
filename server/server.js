// Import dependencies
const express = require("express");
const db = require("./config/db");

//load env variables
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// express app config
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/public"));

//Require application Route modules
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.listen(PORT, function () {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});

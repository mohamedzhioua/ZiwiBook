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

app.listen(PORT, function () {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});

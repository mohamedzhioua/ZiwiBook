const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");

// POST request for creating a new user.
router.post("/signup", UserController.signup);

// GET request for user login.
router.post("/signin", UserController.signin);

// GET request to logout the  user .
router.get("/logout", UserController.logout);

module.exports = router;

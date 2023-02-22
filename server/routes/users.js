const express = require("express");
const router = express.Router();
const multerUploads = require("../middlewares/multerMiddleware")
const checkAuth = require ("../middlewares/checkAuth")
const UserController = require("../controllers/users");
const UserProfileController = require("../controllers/usersProfile");


// POST request for creating a new User.
router.post("/signup", UserController.signup);

// GET request for user login.
router.post("/signin", UserController.signin);

// GET request to logout the  User .
router.get("/logout", UserController.logout);

                 /*   User  Profile   */

// Post request to update the User profile Cover.
router.post("/update/profile/cover",checkAuth, multerUploads, UserProfileController.updateCover);

module.exports = router;

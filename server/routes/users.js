const express = require("express");
const router = express.Router();
const multerUploads = require("../middlewares/multerMiddleware")
const checkAuth = require ("../middlewares/checkAuth")
const UserController = require("../controllers/users");
const UserProfileController = require("../controllers/usersProfile");
const sharpMiddleware = require("../middlewares/sharpMiddleware")

// POST request for creating a new User.
router.post("/signup", UserController.signup);

// GET request for user login.
router.post("/signin", UserController.signin);

// GET request to logout the  User .
router.get("/logout", UserController.logout);

// GET request to get All ZIWIBook Users.
router.get("/getAllUsers", UserController.getAllUsers)

                 /*   User  Profile   */

// Post request to update the User profile Cover.
router.post("/update/profile/cover",checkAuth, multerUploads,sharpMiddleware.resizeProfileCover, UserProfileController.updateProfileCover);

// Post request to update the User profile image.
router.post("/update/profile/Photo",checkAuth, multerUploads,sharpMiddleware.resizeProfilePhoto, UserProfileController.updateProfilePhoto);

// GET request to get all the  User photos .
router.get("/:username/photos",checkAuth, UserProfileController.getPhotos);

module.exports = router;

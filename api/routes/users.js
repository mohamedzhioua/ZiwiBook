const express = require("express");
const router = express.Router();
const multerUploads = require("../middlewares/multerMiddleware");
const checkAuth = require("../middlewares/checkAuth");
const AuthController = require("../controllers/auth");
const UserProfileController = require("../controllers/usersProfile");
const sharpMiddleware = require("../middlewares/sharpMiddleware");

// POST request for creating a new User.
router.post("/signup", AuthController.signup);

// GET request for user login.
router.post("/signin", AuthController.signin);

// GET request to logout the  User .
router.get("/logout", AuthController.logout);

// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(checkAuth);

// POST request to filter users by user term .
router.post("/search", UserProfileController.searchUsers);

/*   User  Profile   */

// Post request to update the User profile Cover.
router.post(
  "/update/profile/cover",
  multerUploads,
  sharpMiddleware.resizeProfileCover,
  UserProfileController.updateProfileCover
);

// Post request to update the User profile image.
router.post(
  "/update/profile/Photo",
  multerUploads,
  sharpMiddleware.resizeProfilePhoto,
  UserProfileController.updateProfilePhoto
);

// GET request to get all the  User photos .
router.get("/:username/photos", UserProfileController.getPhotos);

// GET request to get a user profile.
router.get("/getUserProfile/:username", UserProfileController.getUserProfile);

module.exports = router;

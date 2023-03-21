const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const FriendController = require("../controllers/friends");

// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(checkAuth);

// PUT request to send a friend request .
router.put("/add/:id", FriendController.addFriend);

// PUT request to cancel a friend request .
router.put("/cancel/:friendRequestId", FriendController.cancelRequest);

// PUT request to accept a friend request .
router.put("/accept/:friendRequestId", FriendController.acceptRequest);

// PUT request to unfriend someone .
router.put("/remove/:friendRequestId", FriendController.unfriend);

// GET request to get user's friend list .
router.get("/", FriendController.getFriends);

module.exports = router;

const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const FriendController = require("../controllers/friends");

// PUT request to send a friend request .
router.put("/add/:id", checkAuth, FriendController.addFriend);

// PUT request to cancel a friend request .
router.put(
  "/cancel/:friendRequestId",
  checkAuth,
  FriendController.cancelRequest
);

// PUT request to accept a friend request .
router.put(
  "/accept/:friendRequestId",
  checkAuth,
  FriendController.acceptRequest
);
// GET request to get user's friend list .
router.get("/getAllfriends", checkAuth, FriendController.getFriends);

module.exports = router;

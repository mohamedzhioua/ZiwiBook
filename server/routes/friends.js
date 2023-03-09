const express = require("express");
const router = express.Router();
const checkAuth = require ("../middlewares/checkAuth")
const FriendController = require ("../controllers/friends")

// PUT request to send a friend request .
router.put('/add/:id', checkAuth,FriendController.addFriend);

// GET request to get user's friend list .
router.get('/getAllfriends', checkAuth , FriendController.getFriends);



module.exports = router;

const express = require("express");
const router = express.Router();
const checkAuth = require ("../middlewares/checkAuth")


// PUT request to send a friend request .
router.put('/add/:id', checkAuth,UserController.signup);


const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const NotifController = require("../controllers/notification");


// GET request to fetch all Notif.
router.get("/notifies", checkAuth, NotifController.getNotifcations);

// PATCH request to change the notif seen to true .
router.patch("/isNotifSeen/:id", checkAuth, NotifController.isNotifSeen);

module.exports = router;

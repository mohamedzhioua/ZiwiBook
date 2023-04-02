const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const NotifController = require("../controllers/notification");

// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(checkAuth);

// GET request to fetch all Notif.
router.get("/notifies", NotifController.getNotifcations);

// PATCH request to change the notif seen to true .
router.patch("/isNotifSeen/:id", NotifController.isNotifSeen);

// DELETE a specific Notif.
router.delete("/delete/:id", NotifController.deleteNotif);

module.exports = router;

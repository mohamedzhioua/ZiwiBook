const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const NotifController = require("../controllers/notification");

// POST request to add a new Notif
// router.post("/add", checkAuth, NotifController.createNotifcation);

// GET request to fetch all Notif.
router.get("/notifies", checkAuth, NotifController.getNotifcations);

module.exports = router;

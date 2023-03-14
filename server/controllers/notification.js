const Notif = require("../models/notification");

module.exports = {
  getNotifcations: async (req, res) => {
    try {
      const notifies = await Notif.find({ recipient: req.user.id })
        .sort("-createdAt")
        .populate("sender", ["firstName", "lastName", "photo"]);
      return res.status(201).json(notifies);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //  ----------------------//add new notification method //--------------------------- //

  createNotifcation: async (req, res) => {
    try {
      const { recipient } = req.body;
      if (recipient.includes(req.user.id.toString())) return;

      req.body.sender = req.user.id;

     const notif = await Notif.create(req.body);
      return res.status(201).json(notif);
    } catch (error) {
       res.status(404).json({ message: error.message });
    }
  },
};

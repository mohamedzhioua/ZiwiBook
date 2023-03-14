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
  //  ----------------------//update  notification method to make it seen//--------------------------- //

  isNotifSeen: async (req, res) => {
    try {
      const { id } = req.params;
      const notif = await Notif.findById(id);
      if (!notif) {
        return res.status(404).json({ message: "Notification not found" });
      } else {
        notif.seen = true;
        await notif.save();
        return res.status(201).json(notif);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

const Notif = require("../models/notification");

module.exports = {
  getNotifcations: async (req, res) => {
    try {
      const notifies = await Notif.find({ recipient: req.user.id })
        .sort("-createdAt")
        .populate("sender", ["firstName", "lastName", "photo"]);
      const notseenNotification = await Notif.find({
        recipient: req.user.id,
        seen: false,
      }).countDocuments();
      return res.status(201).json({notifies , notseenNotification});
    } catch (error) {
      return res.status(500).json({ message: error.message  });
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
      return  res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//delete a Notif by id//--------------------------- //

  deleteNotif: async (req, res) => {
    try {
      const { id } = req.params;
      const notif = await Notif.findById(id);
      if (!notif) {
        return res.status(404).json({ message: "Notification not found" });
      } else {
        await notif.remove();
        return res.status(201).json({ message: "Notification has been deleted successfuly" });
      }
    } catch (error) {
      return   res.status(404).json({ message: error.message });
    }
  },


};

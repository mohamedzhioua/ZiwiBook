const Notif = require("../models/notification");
const User = require("../models/user");

module.exports = {
  getNotifcations: async (req, res) => {
    try {
      const notifies = await Notif.find({ recipient: req.user.id })
        .sort("-createdAt")
        .populate("sender", ["firstName", "lastName", "photo"]);
        const data = await User.findById(req.user.id);
        data.unseenNotification = 0;
        await data.save({ validateBeforeSave: false });
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
        const data = await User.findById(req.user.id);
        data.unseenNotification = 0;
        await data.save({ validateBeforeSave: false });
        return res.status(201).json(notif);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

const Notif = require('../models/notification');


module.exports = {
      //  ----------------------//add new notification method //--------------------------- //

    createNotifcation: async (req, res) => {
    try {
      const { recipient, url, content } = req.body;

      if (recipient.includes(req.user._id.toString())) return;

      const notify = new Notifies({
        recipient,
        url,
        content,
        sender: req.user._id,
      });

      await notify.save();
      return res.json({ notify });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

 
};

module.exports = notifyCtrl;
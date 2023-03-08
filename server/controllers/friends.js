const Friend = require("../models/friend");
const User = require("../models/user");

module.exports = {
  addFriend: async (req, res) => {
    const senderId = req.user.id;
    const recipientId = req.params.id;
    try {
      if (senderId === recipientId) {
        return res.status(404).json({ message: "you can't add yourself" });
      }
      const recipient = await User.findById(recipientId);
      if (!recipient) {
        return res.status(404).json({ message: "Unfortunately No user Found" });
      }
      const friendRequestFromSender = await Friend.findOne({
        sender: senderId,
        recipient: recipient._id,
      });

      if (!friendRequestFromSender) {
        const friendRequestFromRecipient = await Friend.findOne({
          sender: recipient._id,
          recipient: senderId,
        });
        if (friendRequestFromRecipient) {
          await friendRequestFromRecipient.remove();
        }
        // Create a new friend request with the status "pending"
        req.body.sender = senderId;
        req.body.recipient = recipient._id;
        req.body.requestStatus = "pending";
        const friendRequest = await Friend.create(req.body);
        return res
          .status(201)
          .json({ message: "friend Request sent with success" });
      } else if (friendRequestFromSender.status === "cancelled") {
        friendRequestFromSender.status = "pending";
        await friendRequestFromSender.save();
        return res
          .status(201)
          .json({ message: "friend Request sent with success" });
      } else {
        return res
          .status(404)
          .json({
            message:
              "You aleardy sent a request or this user alerady sent you a request",
          });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

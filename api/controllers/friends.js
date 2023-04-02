const Friend = require("../models/friend");
const User = require("../models/user");
const { getRelationship } = require("../utils/getRelationship");
const Notification = require("../utils/notification");

module.exports = {
  //  ----------------------//getFriends method //--------------------------- //
  getFriends: async (req, res) => {
    const userId = req.user.id;
    try {
      // friends
      const friends = await Friend.find({
        $or: [{ sender: userId }, { recipient: userId }],
        requestStatus: "accepted",
      })
        .sort({ createdAt: -1 })
        .limit(100)
        .populate({
          path: "sender recipient",
          select: "firstName lastName photo username",
        });
      const friendLists = friends.map((friend) => {
        if (friend.sender._id.equals(userId)) {
          return friend.recipient;
        } else {
          return friend.sender;
        }
      });

      //  received friend requests
      const recivedRequestsNumber = await Friend.countDocuments({
        recipient: userId,
        requestStatus: "pending",
      });
      const recivedRequests = await Friend.find({
        recipient: userId,
        requestStatus: "pending",
      })
        .sort({ createdAt: -1 })
        .limit(100)
        .populate({
          path: "sender",
          select: "firstName lastName photo username",
        });
      //  sent requests
      const sentRequests = await Friend.find({
        sender: userId,
        requestStatus: "pending",
      })
        .sort({ createdAt: -1 })
        .limit(100)
        .populate({
          path: "recipient",
          select: "firstName lastName photo username",
        });
      res.status(200).json({
        data: {
          recivedRequestsNumber,
          friendLists,
          recivedRequests,
          sentRequests,
        },
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//addFriend method //--------------------------- //
  addFriend: async (req, res) => {
    const senderId = req.user.id;
    const recipientId = req.params.id;
    try {
      let newNotif = null;
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
        // Create a new friend request
        req.body.sender = senderId;
        req.body.recipient = recipient._id;
        req.body.requestStatus = "pending";
        const friendRequest = await Friend.create(req.body);
        newNotif = await new Notification({
          recipient: recipient,
          sender: req.user,
          postId: req.user.username,
          postReact: "",
        }).FriendRequest();
        return res.status(201).json({
          message: "friend Request sent with success",
          newNotif: newNotif ? newNotif : null,
        });
      } else if (friendRequestFromSender.requestStatus === "cancelled") {
        // Create a new friend request in case of cancceled one existance
        friendRequestFromSender.requestStatus = "pending";
        await friendRequestFromSender.save();
        newNotif = await new Notification({
          recipient: recipient,
          sender: req.user,
          postId: req.user.username,
          postReact: "",
        }).FriendRequest();
        return res.status(201).json({
          message: "friend Request sent with success",
          newNotif: newNotif ? newNotif : null,
        });
      } else {
        return res.status(404).json({
          message:
            "You aleardy sent a request or this user alerady sent you a request",
        });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//cancelRequest method //--------------------------- //
  cancelRequest: async (req, res) => {
    const friendRequestId = req.params.friendRequestId;
    const senderId = req.user.id;
    try {
      const friendRequest = await Friend.findById(friendRequestId);
      if (
        !friendRequest ||
        friendRequest.requestStatus !== "pending" ||
        (friendRequest.recipient.toString() !== senderId &&
          friendRequest.sender.toString() !== senderId)
      ) {
        return res.status(404).json({ message: "No friend request found" });
      } else {
        friendRequest.requestStatus = "cancelled";
        await friendRequest.save();
        const friendship = await getRelationship(
          senderId,
          friendRequest.recipient.toString()
        );

        // Send reponse
        res.status(200).json(friendship);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  //  ----------------------//accept friend Request method //--------------------------- //
  acceptRequest: async (req, res) => {
    const friendRequestId = req.params.friendRequestId;
    const recipientId = req.user.id;
    try {
      let newNotif = null;
      const friendRequest = await Friend.findById(friendRequestId);

      if (
        !friendRequest ||
        friendRequest.requestStatus !== "pending" ||
        friendRequest.recipient.toString() !== recipientId
      ) {
        return res.status(404).json({ message: "No friend request found" });
      } else {
        friendRequest.requestStatus = "accepted";
        await friendRequest.save();
        const friendship = await getRelationship(
          recipientId,
          friendRequest.sender
        );
        const recipient = await User.findById(friendRequest.sender);
        const newNotif = await new Notification({
          recipient: recipient,
          sender: req.user,
          postId: req.user.username,
          postReact: "",
        }).AcceptFriendRequest();
        return res.status(200).json({
          friendship,
          newNotif: newNotif ? newNotif : null,
        });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//unfriend method //--------------------------- //
  unfriend: async (req, res) => {
    const friendRequestId = req.params.friendRequestId;
    const recipientId = req.user.id;
    try {
      const friendRequest = await Friend.findById(friendRequestId);
      if (
        !friendRequest ||
        friendRequest.requestStatus !== "accepted" ||
        (friendRequest.recipient.toString() !== recipientId &&
          friendRequest.sender.toString() !== recipientId)
      )
        return res.status(404).json({ message: "No friend found" });

      const friendRequestR = friendRequest.recipient.toString();
      const friendRequestS = friendRequest.sender.toString();
      await friendRequest.remove();
      const friendship = await getRelationship(friendRequestR, friendRequestS);
      res.status(200).json(friendship);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

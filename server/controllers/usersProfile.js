const User = require("../models/user");
const Friend = require("../models/friend");
const cloudinary = require("../utils/cloudinary");
const { getRelationship } = require("../utils/getRelationship");

module.exports = {
  //  --------------------------------------- //updateProfileCover method to change user's profile cover//--------------------------- //
  updateProfileCover: async (req, res) => {
    const id = req.user.id;
    try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  --------------------------------------- //updateProfileCover method to change user's profile photo//--------------------------- //
  updateProfilePhoto: async (req, res) => {
    const id = req.user.id;
    try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  --------------------------------------- //getPhotos method to get all user's photos from cloudinary //--------------------------- //
  getPhotos: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that username" });
      }
      const path = `${process.env.APP_NAME}/users/${user.id}/*`;
      const photos = await cloudinary.getImages(path, 100, "desc");
      const resources = photos.resources.map((photo) => {
        return { url: photo.secure_url, id: photo.asset_id };
      });
      const profilePhotos = photos.resources
        .filter(
          (photo) =>
            photo.folder ===
            `${process.env.APP_NAME}/users/${user.id}/profile_photos`
        )
        .map((photo) => {
          return { url: photo.secure_url, id: photo.public_id };
        });

      const profileCovers = photos.resources
        .filter(
          (photo) =>
            photo.folder ===
            `${process.env.APP_NAME}/users/${user.id}/profile_covers`
        )
        .map((photo) => {
          return { url: photo.secure_url, id: photo.public_id };
        });

      res.status(200).json({
        data: {
          resources,
          profilePhotos,
          profileCovers,
        },
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  --------------------------------------- // get A user profile method //--------------------------- //

  getUserProfile: async (req, res) => {
    const { username } = req.params;
    const userId = req.user.id;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that username" });
      }
      const profileId = user.id;
      const friendship = await getRelationship(userId, profileId);
      const friendRequestsAccepted = await Friend.find({
        $or: [{ sender: profileId }, { recipient: profileId }],
        requestStatus: "accepted",
      })
        .sort({ createdAt: -1 })
        .limit(9)
        .populate({
          path: "sender recipient",
          select: "firstName lastName photo username ",
        });

      // Map the friend documents to an array of user documents
      const friends = friendRequestsAccepted.map((friendRequestAccepted) => {
        if (friendRequestAccepted.sender._id.equals(profileId)) {
          return friendRequestAccepted.recipient;
        } else {
          return friendRequestAccepted.sender;
        }
      });
      return res.status(200).json({
        data: { user, friendship, friends },
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

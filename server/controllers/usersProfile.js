// Load User model
const sharp = require("sharp");
const User = require("../models/user");

// Load cloudinary methods
const cloudinary = require("../utils/cloudinary");

module.exports = {
  getPhotos : async (req,res)=>{
    const { username } = req.params;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
        .status(404)
        .json({ message: "No user found with that username" });
      }
      const path = `${process.env.APP_NAME}/users/${user.id}/*`;
      const photos = await cloudinary.getImages(path, 100, 'desc');
      const resources = photos.resources.map((photo) => {
        return { url: photo.secure_url, id: photo.asset_id };
      });
      
    } catch (error) {
      
    }
  },
  updateCover: async (req, res) => {
    const id = req.user.id;
    const { file } = req;
    try {
      if (!file) {
        return res
        .status(404)
        .json({ message: "Please provide a cover photo " });
    } else {
        const path = `${process.env.APP_NAME}/users/${id}/profile_photos/`;
        const data  = await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('webp')
        .webp({ quality: 90 })
        .toBuffer();

        const imageDetails = await cloudinary.uploadToCloudinary(
          data ,
          path
        );
          req.body.cover = imageDetails.url
        const user = await User.findByIdAndUpdate(id, req.body,{new: true})
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

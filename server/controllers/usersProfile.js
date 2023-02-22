// Load User model
const User = require("../models/user");
// // Load Datauri method
// const { bufferToDataURI } = require("../utils/Datauri");
// Load cloudinary methods
const cloudinary = require("../utils/cloudinary");

module.exports = {
  updateCover: async (req, res) => {
    const id = req.user.id;
    const { file } = req;
    console.log("🚀 ~ file: usersProfile.js:12 ~ updateCover: ~ file:", req.file)
    try {
      if (!file) {
        return res
        .status(404)
        .json({ message: "Please provide a cover photo " });
    } else {
        const userData = await User.findById(id);
        const fileFormat = file.mimetype.split("/")[1];
        const { base64 } = bufferToDataURI(fileFormat, file.buffer);
        const imageDetails = await cloudinary.uploadToCloudinary(
          base64,
          fileFormat
        );
        const data = {
          image: imageDetails.url,
          _id: imageDetails.public_id,
        };
        userData.cover.push(data);
        const user = await User.findByIdAndUpdate(id,userData,{new: true})
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

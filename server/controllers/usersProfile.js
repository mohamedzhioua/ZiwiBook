// Load User model
const User = require("../models/user");


module.exports = {
  updateProfileCover: async (req, res) => {
    const id = req.user.id;
    try {
        const user = await User.findByIdAndUpdate(id, req.body,{new: true})
        res.status(200).json(user);
    
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  updateProfilePhoto: async (req, res) => {
    const id = req.user.id;
    try {
        const user = await User.findByIdAndUpdate(id, req.body,{new: true})
        res.status(200).json(user);
     } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
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
      const profilePhotos = photos.resources
      .filter(
        (photo) =>
          photo.folder ===
          `${process.env.APP_NAME}/users/${user.id}/profile_photos`
      )
      .map((photo) => {
        return { url: photo.secure_url, id: photo.asset_id };
      });
  
    const profileCovers = photos.resources
      .filter(
        (photo) =>
          photo.folder ===
          `${process.env.APP_NAME}/users/${user.id}/profile_covers`
      )
      .map((photo) => {
        return { url: photo.secure_url, id: photo.asset_id };
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
};

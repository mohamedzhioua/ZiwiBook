const cloudinary = require("cloudinary").v2;

//here is cloudinary api credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = {
  // Upload image to cloudinary
  uploadToCloudinary: async (fileString, format) => {
    try {
      const { uploader } = cloudinary;

      const res = await uploader.upload(
        `data:image/${format};base64,${fileString}`
      );

      return res;
    } catch (error) {
      console.log(error);
    }
  },
  //  delete image from cloudinary
  removeFromCloudinary: async (public_id) => {
    await cloudinary.uploader.destroy(public_id, function (error, result) {
      console.log("result--->", result);
      console.log("cloudinaryError--->", error);
    });
  },
  
};

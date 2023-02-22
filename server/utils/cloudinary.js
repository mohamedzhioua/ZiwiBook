const cloudinary = require("cloudinary");

//here is cloudinary api credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = {
  // Upload image to cloudinary

  // uploadToCloudinary: async (fileString, format) => {
  //   try {
  //     const { uploader } = cloudinary;

  //     const res = await uploader.upload(
  //       `data:image/${format};base64,${fileString}`
  //     );
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  
  uploadToCloudinary : async (file, path) => {
    return new Promise((resolve, reject) => {
      if (file) {
        cloudinary.v2.uploader
          .upload_stream({ folder: path }, (err, res) => {
            if (err) {
              console.log("🚀 ~ file: cloudinary.js:32 ~ .upload_stream ~ err:", err)
              reject(err);
            } else {
              console.log(`Upload succeed: ${res}`);
              resolve(res);
            }
          })
          .end(file);
      }
    });
  },

  //  delete image from cloudinary
  removeFromCloudinary: async (public_id) => {
    await cloudinary.uploader.destroy(public_id, function (error, result) {
      console.log("🚀 ~ file: cloudinary.js:28 ~ result", result)
      console.log("🚀 ~ file: cloudinary.js:28 ~ error", error)
      });
  },
  
};

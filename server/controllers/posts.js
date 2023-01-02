// Load Post model
const Post = require("../models/post");
// Load input validation
const PostValidation = require("../validator/PostValidation");
// Load cloudinary methods
const cloudinary = require("../utils/cloudinary");
// Load Datauri method
const { bufferToDataURI } = require("../utils/Datauri");

module.exports = {
  //  ----------------------//addPost method //--------------------------- //

  addPost: async (req, res) => {
    const { errors, isValid } = PostValidation(req.body);
    const { file } = req;
    try {
      if (!isValid) {
        return res.status(404).json(errors);
      }
      if (file) {
        const fileFormat = file.mimetype.split("/")[1];
        const { base64 } = bufferToDataURI(fileFormat, file.buffer);
        const imageDetails = await cloudinary.uploadToCloudinary(
          base64,
          fileFormat
        );
        req.body.user = req.user.id;
        req.body.image = imageDetails.url;
        req.body.cloudinary_id = imageDetails.public_id;
        await Post.create(req.body);
        res.status(200).json({ message: "post added with success" });
      } else {
        req.body.user = req.user.id;
        await Post.create(req.body);
        res.status(200).json({ message: "post added with success" });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  //  ----------------------//updatePost method //--------------------------- //

  updatePost: async (req, res) => {
    const { errors, isValid } = PostValidation(req.body);
    const { file } = req;
    try {
      const data = await Post.findById({ _id: req.params.id });
      if (!isValid) {
        return res.status(404).json(errors);
      }
      if (file) {
        await cloudinary.removeFromCloudinary(data.cloudinary_id);
        const fileFormat = file.mimetype.split("/")[1];
        const { base64 } = bufferToDataURI(fileFormat, file.buffer);
        const imageDetails = await cloudinary.uploadToCloudinary(
          base64,
          fileFormat
        );
        const post = {
          title: req.body.title || data.title,
          body: req.body.body || data.body,
          image: imageDetails.url,
          cloudinary_id: imageDetails.public_id,
        };
        const y = await Post.findByIdAndUpdate({ _id: req.params.id }, post, {
          new: true,
        });
        res.status(201).json({ message: "post updated with success" });
      } else {
        const x = await Post.findByIdAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res.status(201).json({ message: "post updated with success" });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  //  ----------------------//deletePost method //--------------------------- //

  deletePost: async (req, res) => {
    try {
      const data = await Post.findById({ _id: req.params.id });
      if (data.cloudinary_id) {
        await cloudinary.removeFromCloudinary(data.cloudinary_id);
        await data.remove();
        return res.status(201).json({ message: "post deleted with success" });
      } else {
        await data.remove();
        return res.status(201).json({ message: "post deleted with success" });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  //  -----------------------//getOnePost method //--------------------------- //

  getOnePost: async (req, res) => {
    try {
      const data = await Post.findById({ _id: req.params.id });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  },
  //  -----------------------//getAllPost method //--------------------------- //

  getAllPost: async (req, res) => {
    try {
      const data = await Post.find();
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  },
  //  -----------------------//getAllPost by userID method //--------------------------- //
  getAllPostbyUser: async (req, res) => {
    try {
      const data = await Post.find({ userID: req.params.userID });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  },
};

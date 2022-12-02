// Load Post model
const Post = require("../models/post");
// Load input validation
const PostValidation = require("../validator/PostValidation");
// Load cloudinary methods
const cloudinary = require("../utils/cloudinary");
// Load Datauri method
const { bufferToDataURI } = require("../utils/Datauri");

module.exports = {
  //  ----------------------//addPost method to add a new user//--------------------------- //

  addPost: async (req, res) => {
    const { errors, isValid } = PostValidation(req.body);
    const { title, body, userID } = req.body;
    const { file } = req;
    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        const fileFormat = file.mimetype.split("/")[1];
        const { base64 } = bufferToDataURI(fileFormat, file.buffer);
        const imageDetails = await cloudinary.uploadToCloudinary(
          base64,
          fileFormat
        );
        await Post.create({
          title,
          body,
          userID,
          image: imageDetails.url,
          cloudinary_id: imageDetails.public_id,
        });
        res.status(201).json({ message: "post added with success" });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  //  ----------------------//updatePost method to add a new user//--------------------------- //

  updatePost: async (req, res) => {
    const { errors, isValid } = PostValidation(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await Post.findByIdAndUpdate({ _id: req.params.id });
        res.status(201).json({ message: "post updated with success" });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  //  ----------------------//deletePost method to add a new user//--------------------------- //

  deletePost: async (req, res) => {
    try {
      await Post.deleteOne({ _id: req.params.id });
      res.status(201).json({ message: "post deleted with success" });
    } catch (error) {
      console.log(error.message);
    }
  },
  //  -----------------------//getOnePost method to add a new user//--------------------------- //

  getOnePost: async (req, res) => {
    try {
      const data = await Post.findById({ _id: req.params.id });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  },
  //  -----------------------//getAllPost method to add a new user//--------------------------- //

  getAllPost: async (req, res) => {
    try {
      const data = await Post.find();
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  },
  //  -----------------------//getAllPost by userID method to add a new user//--------------------------- //
  getAllPostbyUser: async (req, res) => {
    try {
      const data = await Post.find({ userID: req.params.userID });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  },
};

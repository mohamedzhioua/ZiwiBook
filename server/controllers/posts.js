// Load Post model
const Post = require("../models/post");
// Load input validation
const PostValidation = require("../validator/PostValidation");
module.exports = {
  addPost: async (req, res) => {
    const { errors, isValid } = PostValidation(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await Post.create(req.body);
        res.status(201).json({ message: "post added with success" });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
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
  deletePost: async (req, res) => {

  },
  getOnePost: async (req, res) => {},
  getAllPost: async (req, res) => {},
};

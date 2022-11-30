// Load Post model
const Post = require("../models/post");
// Load input validation
const PostValidation = require("../validator/PostValidation");
module.exports = {
  addPost: async (req, res) => {
    const { errors, isvalid } = PostValidation(req.body);
    try {
      if (!isvalid) {
        res.status(404).json(errors);
      } else {
        await Post.create(req.body);
        res.status(201).json({message:"post added with sucess"})
      }
    } catch (error) {
        console.log(error.message);
    }
  },
  updatePost: async (req, res) => {},
  deletePost: async (req, res) => {},
  getOnePost: async (req, res) => {},
  getAllPost: async (req, res) => {},
};

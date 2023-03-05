const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Reaction = require("../models/reaction");

const PostValidation = require("../validator/PostValidation");
const cloudinary = require("../utils/cloudinary");
const sharp = require("sharp");

module.exports = {
  //  ----------------------//addPost method //--------------------------- //

  addPost: async (req, res) => {
    const { errors, isValid } = PostValidation(req.body);
    const { file } = req;
    const id = req.user.id;
    try {
      if (!isValid) {
        return res.status(404).json(errors);
      }
      if (file) {
        const path = `${process.env.APP_NAME}/users/${id}/posts_photos/`;
        const data = await sharp(req.file.buffer)
          .toFormat("webp")
          .webp({ quality: 90 })
          .toBuffer();

        const imageDetails = await cloudinary.uploadToCloudinary(data, path);
        req.body.owner = id;
        req.body.image = imageDetails.url;
        req.body.cloudinary_id = imageDetails.public_id;
        const memo = await Post.create(req.body);
        return res.status(200).json(memo);
      } else {
        req.body.owner = id;
        const memo = await Post.create(req.body);
        return res.status(200).json(memo);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//updatePost method //--------------------------- //

  updatePost: async (req, res) => {
    const { errors, isValid } = PostValidation(req.body);
    const { file } = req;
    try {
      if (!isValid) {
        return res.status(404).json(errors);
      }
      const data = await Post.findById({ _id: req.params.id });
      if (file && data.cloudinary_id) {
        await cloudinary.removeFromCloudinary(data.cloudinary_id);
      }
      if (file) {
        const path = `${process.env.APP_NAME}/users/${req.user.id}/posts_photos/`;
        const data = await sharp(req.file.buffer)
          .toFormat("webp")
          .webp({ quality: 90 })
          .toBuffer();

        const imageDetails = await cloudinary.uploadToCloudinary(data, path);
        const post = {
          text: req.body.text || data.text,
          image: imageDetails.url,
          cloudinary_id: imageDetails.public_id,
        };
        const memo = await Post.findByIdAndUpdate(
          { _id: req.params.id },
          post,
          {
            new: true,
          }
        );
        res.status(200).json(memo);
      } else {
        const memo = await Post.findByIdAndUpdate(
          { _id: req.params.id },
          req.body,
          {
            new: true,
          }
        );
        res.status(200).json(memo);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//deletePost method //--------------------------- //

  deletePost: async (req, res) => {
    try {
      const memo = await Post.findById({ _id: req.params.id });
      if (memo.cloudinary_id) {
        await cloudinary.removeFromCloudinary(memo.cloudinary_id);
      }
      await memo.remove();
      return res.status(200).json({ message: "post deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  -----------------------//getOnePost method //--------------------------- //

  getOnePost: async (req, res) => {
    try {
      const memo = await Post.findById({ _id: req.params.id });
      res.status(200).json(memo);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  -----------------------//getAllPost method //--------------------------- //

  getAllPost: async (req, res) => {
    try {
      const memo = await Post.find().populate("owner", [
        "firstName",
        "lastName",
        "photo",
        "username",
      ]);
      res.status(200).json(memo);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  -----------------------//getAllPost by userID method //--------------------------- //
  getAllPostbyUser: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that username" });
      }
      const posts = await Post.find({ owner: user._id });
      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//like Post method //--------------------------- //
  like: async (req, res) => {
    const { id } = req.params;

    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({message :"this post no more exist"});
      }
      const data = await Reaction.findOne({
        post: id,
        owner: String(req?.user?.id)
      });
      if (!data) {
        req.body.post = id;
        req.body.owner = req?.user?.id;
        const like = await Reaction.create(req.body);
        return res.status(200).json(like);
      } else {
      await data.remove()
      return res.status(200).json({message:"reaction removed"});
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
    //  -----------------------//getAllLikes method //--------------------------- //

    getPostReactions: async (req, res) => {
      const {postId } = req.params;

      try {
        const reaction = await Reaction.find({postId});
         res.status(200).json(reaction);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    },
  //  ----------------------//add Comment method //--------------------------- //
  addComment: async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const owner = req.user.id;
    try {
      if (!id || !text)
        return res
          .status(404)
          .json({ message: "Please provide comment data and post" });

      const checkPost = await Post.findById(id);
      if (!checkPost) return res.status(404).json({ message: "No post found" });

      const commentData = await Comment.create({
        owner,
        post: id,
        text,
      });

      res.status(200).json(commentData);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//add Reply To a Comment method //--------------------------- //

  addCommentReply: async (req, res) => {
    const parentId = req.params.id;
    const { text } = req.body;
    const owner = req.user.id;
    try {
      const checkComment = await Comment.findById(parentId);
      if (!checkComment)
        return res.status(404).json({ message: "No comment found" });
      const commentData = await Comment.create({
        post: checkComment.post,
        owner,
        parentId,
        text,
      });
      res.status(200).json(commentData);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//get all Comments method//--------------------------- //
  getComments: async (req, res) => {
    try {
      const comments = await Comment.find().populate("owner", [
        "firstName",
        "lastName",
        "photo",
        "username",
      ]);
      res.status(200).json(comments);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//delete Comment method//--------------------------- //

  deleteComment: async (req, res) => {
    const CommentID = req.params.id;
    try {
      const comments = await Comment.findByIdAndRemove(CommentID);
      res.status(200).json({ message: "comment deleted successefully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//update Comment method//--------------------------- //

  updateComment: async (req, res) => {
    const CommentID = req.params.id;
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        CommentID,
        req.body,
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({ message: "comment updated successfully", updatedComment });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//like Comment method //--------------------------- //
  likeComment: async (req, res) => {
    const { id } = req.params;

    try {
      const data = await Comment.findById(id);
      const index = data.likes.findIndex((id) => id === String(req.user.id));
      if (index === -1) {
        data.likes.push(req.user.id);
      } else {
        data.likes = data.likes.filter((id) => id !== String(req.user.id));
      }
      const LikedComment = await Comment.findByIdAndUpdate(id, data, {
        new: true,
      });
      res.status(200).json(LikedComment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

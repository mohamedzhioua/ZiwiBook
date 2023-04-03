const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Reaction = require("../models/reaction");
const Friend = require('../models/friend');
const PostValidation = require("../validator/PostValidation");
const cloudinary = require("../utils/cloudinary");
const sharp = require("sharp");
const Notification = require("../utils/notification");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  //  ----------------------//addPost method //--------------------------- //

  addPost: catchAsync(async (req, res) => {
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
        const postdata = await Post.create(req.body);
        return res.status(200).json(postdata);
      } else {
        req.body.owner = id;
        const postdata = await Post.create(req.body);
        return res.status(200).json(postdata);
      }
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }),
  //  ----------------------//updatePost method //--------------------------- //

  updatePost: catchAsync(async (req, res) => {
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
        const postdata = await Post.findByIdAndUpdate(
          { _id: req.params.id },
          post,
          {
            new: true,
          }
        );
        res.status(200).json(postdata);
      } else {
        const postdata = await Post.findByIdAndUpdate(
          { _id: req.params.id },
          req.body,
          {
            new: true,
          }
        );
        res.status(200).json(postdata);
      }
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }),
  //  ----------------------//deletePost method //--------------------------- //

  deletePost: async (req, res) => {
    try {
      const postdata = await Post.findById({ _id: req.params.id });
      if (postdata.cloudinary_id) {
        await cloudinary.removeFromCloudinary(postdata.cloudinary_id);
      }
      await postdata.remove();
      return res.status(200).json({ message: "post deleted successfully" });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
  //  -----------------------//getOnePost method //--------------------------- //

  getOnePost: async (req, res) => {
    try {
      const postdata = await Post.findById({ _id: req.params.id }).populate("owner", [
        "firstName",
        "lastName",
        "photo",
        "username",
      ]);
      res.status(200).json(postdata);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  //  -----------------------//getAllPost method //--------------------------- //

  getAllPost: async (req, res) => {
    const userId = req.user.id;
    try {
     // friends
     const friends = await Friend.find({
      $or: [{ sender: userId }, { recipient: userId }],
      requestStatus: "accepted",
    })
    const friendsIds = friends.map((friend) => {
      if (friend.sender._id.equals(userId)) {
        return friend.recipient;
      } else {
        return friend.sender;
      }
    });
      let filter = { owner: { $in: [...friendsIds, userId] } };

      const postdata = await Post.find(filter).populate("owner", [
        "firstName",
        "lastName",
        "photo",
        "username",
      ]);
      res.status(200).json(postdata);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
  //  -----------------------//getAllPost by username method //--------------------------- //
  getAllPostbyUser: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that username" });
      }
      const posts = await Post.find({ owner: user._id }).populate("owner", [
        "firstName",
        "lastName",
        "photo",
      ]);
      res.status(200).json(posts);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//like Post method //--------------------------- //
  like: async (req, res) => {
    const { id } = req.params;

    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "this post no more exist" });
      }
      const data = await Reaction.findOne({
        post: id,
        owner: String(req?.user?.id),
      });

      if (!data) {
        let newNotif = null;
        req.body.post = id;
        req.body.owner = req?.user?.id;
        const like = await Reaction.create(req.body);
        const recipient = await User.findById(post.owner);
        newNotif = await new Notification({
          recipient,
          sender: req.user,
          postId: id,
        }).PostLike();
        return res
          .status(200)
          .json({ like, newNotif: newNotif ? newNotif : null });
      } else {
        await data.remove();
        return res.status(200).json({ message: "reaction removed" });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
  //  -----------------------//getAllLikes method //--------------------------- //

  getPostsReactions: async (req, res) => {
    try {
      const reaction = await Reaction.find();
      res.status(200).json(reaction);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//add Comment method //--------------------------- //
  addComment: async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const owner = req.user.id;
    try {
      let newNotif = null;
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
      const recipient = await User.findById(checkPost.owner);
      newNotif = await new Notification({
        recipient,
        sender: req.user,
        postId: id,
        postReact: text.slice(0, 10),
      }).PostComment();
      res
        .status(200)
        .json({ commentData, newNotif: newNotif ? newNotif : null });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//add Reply To a Comment method //--------------------------- //

  addCommentReply: async (req, res) => {
    const parentId = req.params.id;
    const { text } = req.body;
    const owner = req.user.id;
    try {
      let newNotif = null;
      const checkComment = await Comment.findById(parentId);
      if (!checkComment)
        return res.status(404).json({ message: "No comment found" });
      const commentData = await Comment.create({
        post: checkComment.post,
        owner,
        parentId,
        text,
      });
      const recipient = await User.findById(checkComment.owner);
      newNotif = await new Notification({
        recipient,
        sender: req.user,
        postId: checkComment.post,
        postReact: text.slice(0, 10),
      }).CommentReplie();
      res.status(200).json(commentData);
    } catch (error) {
      return res.status(404).json({ message: error.message });
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
      return res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//delete Comment method//--------------------------- //

  deleteComment: async (req, res) => {
    const CommentID = req.params.id;
    try {
      const comments = await Comment.findByIdAndRemove(CommentID);
      res.status(200).json({ message: "comment deleted successefully" });
    } catch (error) {
      return res.status(404).json({ message: error.message });
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
      return res.status(404).json({ message: error.message });
    }
  },
  //  ----------------------//like Comment method //--------------------------- //
  likeComment: async (req, res) => {
    const { id } = req.params;

    try {
      let newNotif = null;
      const data = await Comment.findById(id);
      const index = data.likes.findIndex((id) => id === String(req.user.id));
      if (index === -1) {
        data.likes.push(req.user.id);
        const recipient = await User.findById(data.owner);
        newNotif = await new Notification({
          recipient,
          sender: req.user,
          postId: data.post,
        }).CommentLike();
      } else {
        data.likes = data.likes.filter((id) => id !== String(req.user.id));
      }
      const LikedComment = await Comment.findByIdAndUpdate(id, data, {
        new: true,
      });

      return res
        .status(200)
        .json({ LikedComment, newNotif: newNotif ? newNotif : null });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
};

const express = require("express");
const router = express.Router();
const PostController = require("../controllers/posts");
const multerUploads = require("../middlewares/multerMiddleware");
const checkAuth = require("../middlewares/checkAuth");
const limiter = require("../middlewares/postsLimiter")
// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE
router.use(checkAuth);
// POST request
router.post("/addPost",limiter, multerUploads, PostController.addPost);

// GET request
router.get("/getOnePost/:id", PostController.getOnePost);

// GET request
router.get("/", PostController.getAllPost);

// GET request
router.get("/:username/posts", PostController.getAllPostbyUser);

// PUT request
router.patch("/updatePost/:id", multerUploads, PostController.updatePost);

// DELETE request
router.delete("/deletePost/:id", PostController.deletePost);

// PUT request
router.put("/like/:id", PostController.like);

// GET request
router.get("/getPostsReactions", PostController.getPostsReactions);

//-------------------------------------Comments-------------------------------//

// Post request
router.post("/addComment/:id", PostController.addComment);

// Post request
router.post("/addCommentReply/:id", PostController.addCommentReply);

// GET request
router.get("/getComments", PostController.getComments);

// Delete request
router.delete("/deleteComment/:id", PostController.deleteComment);

// PUT request
router.put("/updateComment/:id", PostController.updateComment);

// PATCH request
router.patch("/Commentlike/:id", PostController.likeComment);

module.exports = router;

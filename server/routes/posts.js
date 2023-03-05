const express = require("express");
const router = express.Router();
const PostController = require("../controllers/posts");
const multerUploads = require("../middlewares/multerMiddleware")
const checkAuth = require ("../middlewares/checkAuth")

// POST request
router.post("/addPost",checkAuth,multerUploads, PostController.addPost);

// GET request
router.get("/getOnePost/:id",checkAuth, PostController.getOnePost);

// GET request
router.get("/getAllPost",PostController.getAllPost);

// GET request
router.get("/:username/posts",checkAuth, PostController.getAllPostbyUser);

// PUT request
router.patch("/updatePost/:id",checkAuth,multerUploads, PostController.updatePost);

// DELETE request
router.delete("/deletePost/:id",checkAuth, PostController.deletePost);

// PUT request
router.put("/like/:id",checkAuth, PostController.like);

// GET request
router.get("/getPostReactions/:id", PostController.getPostReactions);


//-------------------------------------Comments-------------------------------//

// Post request
router.post("/addComment/:id",checkAuth, PostController.addComment);

// Post request
router.post("/addCommentReply/:id",checkAuth, PostController.addCommentReply);

// GET request
router.get("/getComments", PostController.getComments);

// Delete request
router.delete("/deleteComment/:id",checkAuth, PostController.deleteComment);

// PUT request
router.put("/updateComment/:id",checkAuth, PostController.updateComment);

// PATCH request
router.patch("/Commentlike/:id",checkAuth, PostController.likeComment);

module.exports = router;

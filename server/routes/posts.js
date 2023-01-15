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
router.get("/getAllPost",checkAuth, PostController.getAllPost);

// GET request
router.get("/getAllPostbyUser",checkAuth, PostController.getAllPostbyUser);

// PUT request
router.put("/updatePost/:id",checkAuth,multerUploads, PostController.updatePost);

// DELETE request
router.delete("/deletePost/:id",checkAuth, PostController.deletePost);

// PATCH request
router.patch("/like/:id",checkAuth, PostController.like);


//-------------------------------------Comments-------------------------------//

// Post request
router.post("/addComment/:id",checkAuth, PostController.addComment);

// Post request
router.post("/addCommentReply/:id",checkAuth, PostController.addCommentReply);

// GET request
router.get("/getComments",checkAuth, PostController.getComments);

// Delete request
router.delete("/deleteComment/:id",checkAuth, PostController.deleteComment);

module.exports = router;

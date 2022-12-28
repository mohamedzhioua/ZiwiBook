const express = require("express");
const router = express.Router();
const PostController = require("../controllers/posts");
const multerUploads = require("../middlewares/multerMiddleware")
const checkAuth = require ("../middlewares/checkAuth")
// POST request
router.post("/addPost",checkAuth,multerUploads, PostController.addPost);

// GET request
router.get("/getOnePost/:id", PostController.getOnePost);

// GET request
router.get("/getAllPost", PostController.getAllPost);

// GET request
router.get("/getAllPostbyUser", PostController.getAllPostbyUser);

// PUT request
router.put("/updatePost/:id",multerUploads, PostController.updatePost);

// DELETE request
router.delete("/deletePost/:id", PostController.deletePost);

module.exports = router;

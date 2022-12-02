const express = require("express");
const router = express.Router();
const PostController = require("../controllers/posts");
const multerUploads = require("../middlewares/multerMiddleware")
// POST request
router.post("/addPost",multerUploads, PostController.addPost);

// GET request
router.get("/getOnePost", PostController.getOnePost);

// GET request
router.get("/getAllPost", PostController.getAllPost);

// GET request
router.get("/getAllPostbyUser", PostController.getAllPostbyUser);

// PUT request
router.put("/updatePost", PostController.updatePost);

// DELETE request
router.delete("/deletePost", PostController.deletePost);

module.exports = router;

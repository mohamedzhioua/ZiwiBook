const express = require("express");
const router = express.Router();
const PostController = require("../controllers/posts");

// POST request
router.post("/addPost", PostController.addPost);

// GET request
router.get("/getOnePost", PostController.getOnePost);

// GET request
router.get("/getAllPost", PostController.getAllPost);

// PUT request

router.put("/updatePost", PostController.updatePost);

// DELETE request

router.delete("/deletePost", PostController.deletePost);

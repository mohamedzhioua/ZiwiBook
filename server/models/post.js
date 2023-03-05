const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Load Comment model
const Comment = require("./comment");

const PostSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "no photo",
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

// delete post comments when the post is removed
PostSchema.pre("remove", async function (next) {
  const post = this;
  await Comment.deleteMany({ post: post._id });
  next();
});

module.exports = mongoose.model("post", PostSchema);

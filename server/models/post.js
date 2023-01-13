const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", PostSchema);

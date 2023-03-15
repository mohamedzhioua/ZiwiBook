const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    parentId : {
      type: String,
      default: null
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    text: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("comment", CommentSchema);

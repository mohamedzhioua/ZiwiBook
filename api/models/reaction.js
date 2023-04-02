const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReactionSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
     },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reaction", ReactionSchema);

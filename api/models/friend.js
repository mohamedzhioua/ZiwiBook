const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "user", required: true },
    recipient: {
      type: Schema.Types.ObjectId,

      ref: "user",
      required: true,
    },
    requestStatus: {
      type: String,
      enum: ["pending", "accepted", "cancelled"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("friend", FriendSchema);

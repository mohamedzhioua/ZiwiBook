const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    url: String,
    content: {
      type: String,
      trim: true,
    },
    seen: {type:Boolean, default: false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", NotificationSchema);

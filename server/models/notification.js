const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User =require("../models/user")

const NotificationSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "user" },
    recipient: { type: Schema.Types.ObjectId, ref: "user" },
    url: {
      type: String,
    },
    content: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['react', 'comment', 'friend'],
    },
    seen: {type:Boolean, default: false}
  },
  { timestamps: true }
);

NotificationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'sender',
    select: 'photo',
  });
  next();
});

NotificationSchema.post('save', async function () {
  this.populate({
    path: 'sender',
    select: 'photo',
  });
});

module.exports = mongoose.model("notification", NotificationSchema);

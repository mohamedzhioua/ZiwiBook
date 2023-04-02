const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./post");
const Comment = require("./comment");
const Reaction = require("./reaction");
const Friend = require("./friend");
const Notification = require("./notification");
const { generateFromEmail } = require("unique-username-generator");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      text: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    birthYear: {
      type: Number,
      required: true,
      trim: true,
    },
    birthMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    birthDay: {
      type: Number,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },

    cover: { type: String },
    details: {
      bio: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      homeTown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a realationship", "Married", "Divorced", ""],
      },
      instagram: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

// delete user posts when the user is removed
UserSchema.pre("remove", async function (next) {
  const user = this;
  await Post.deleteMany({ owner: user._id });
  next();
});

// delete user reactions when the user is removed
UserSchema.pre("remove", async function (next) {
  const user = this;
  await Reaction.deleteMany({ owner: user._id });
  next();
});

// delete user comments when the user is removed
UserSchema.pre("remove", async function (next) {
  const user = this;
  await Comment.deleteMany({ owner: user._id });
  next();
});
// delete user from others friends lists when the user is removed
UserSchema.pre("remove", async function (next) {
  const user = this;
  await Friend.deleteMany({
    $or: [{ sender: user._id }, { recipient: user._id }],
  });
  next();
});
// delete user Notifications when the user is removed
UserSchema.pre("remove", async function (next) {
  const user = this;
  await Notification.deleteMany({
    $or: [{ sender: user._id }, { recipient: user._id }],
  });
  next();
});
// generate a username from the user email
UserSchema.pre("save", function (next) {
  if (this.isNew) {
    const user = this;
    user.username = generateFromEmail(user.email, 4);
  }
  next();
});

module.exports = mongoose.model("user", UserSchema);

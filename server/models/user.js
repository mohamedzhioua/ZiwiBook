const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Load Comment model
const Post = require("./post");

const UserSchema = new Schema(
  {
    name: {
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
    image: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg",
    },
    cloudinary_id: String,
  },
  { timestamps: true }
);

// delete user posts when the user is removed
UserSchema.pre("remove", async function (next) {
  const user = this;
  await Post.deleteMany({ owner: user._id });
  next();
});

module.exports = mongoose.model("user", UserSchema);

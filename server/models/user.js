const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Load Comment model
const Post = require("./post");

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
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    birthYear: {
      type: Number,
      required: true,
      select: false,

    },
    birthMonth: {
      type: Number,
      required: true,
      select: false,
    },
    birthDay: {
      type: Number,
      required: true,
      select: false,
    },
    photo: [
      {
        image:{ 
          type: String,
          default:
          "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"} ,
        cloudinary_id: String,
       
      },
    ],
    cover: [{ image: String , cloudinary_id: String }],
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

module.exports = mongoose.model("user", UserSchema);

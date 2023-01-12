const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    PostedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image:{
      type: String,
      default :'no photo'
    }, 
    cloudinary_id: String,
    likes: {
      type: [String],
      default: [],
    },
    Comments: [
			{
				Text: String,
				PostedBy: {
					type: Schema.Types.ObjectId,
					ref: "user",
				},
			},
		],
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", PostSchema);

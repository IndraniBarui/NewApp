import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  images: {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    // size: [
    //   {
    //     type: String,
    //     enum: ["S", "M", "L", "XL", "XXL"],
    //   },
    // ],
    // colors: [
    //   {
    //     type: String,
    //     enum: ["1", "2", "3", "4", "5"],
    //   },
    // ],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;

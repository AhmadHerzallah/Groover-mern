import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    author: { type: mongoose.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);
export default Post;

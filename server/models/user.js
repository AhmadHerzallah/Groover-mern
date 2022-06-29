import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    avatar: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;

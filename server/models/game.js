import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    title: String,
    platform: String,
    status: String,
    link: String
  },
  { timestamps: true }
);

export default mongoose.model("Game", GameSchema);

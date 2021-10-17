const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: String,
    contentsub: String,
    community: String,

    title: String,
    trend1: String,
    trend2: String,
    trend3: String,
    images: {
      type: Array,
      required: false,
    },
    images2: {
      type: Array,
      required: false,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    likelefts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    likerights: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comment",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    reports: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);

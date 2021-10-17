const mongoose = require("mongoose");
const { Schema } = mongoose;

const bostSchema = new Schema(
  {
    content: String,
    contentsub: String,
    community: String,
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
    bomments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "bomment",
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

module.exports = mongoose.model("bost", bostSchema);

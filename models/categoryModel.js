const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    ImageURL: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/02/41/30/72/360_F_241307210_MjjaJC3SJy2zJZ6B7bKGMRsKQbdwRSze.jpg",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);

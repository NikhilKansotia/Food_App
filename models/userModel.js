const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone no. is required"],
    },
    userType: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png",
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);

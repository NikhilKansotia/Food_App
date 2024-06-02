const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    food: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enunm: ["preparing", "prepared", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Orders", orderSchema);

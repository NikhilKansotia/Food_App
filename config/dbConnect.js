const mongoose = require("mongoose");
function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
}
module.exports = dbConnect;

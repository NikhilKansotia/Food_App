const userModel = require("../models/userModel.js");
async function decrypt(req, res, next) {
  try {
    const user = req.body.id;
    if (user.userType !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only admin access",
      });
    } else next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "UnAuthorized ACCESS",
    });
  }
}
module.exports = decrypt;

const jwt = require("jsonwebtoken");
async function decrypt(req, res, next) {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Unauthorized user",
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Auth API",
    });
  }
}
module.exports = decrypt;

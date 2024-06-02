const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//routes
//getUser
router.get("/getUser", authMiddleware, getUserController);
//update user
router.put("/updateUser", authMiddleware, updateUserController);
//password update
router.post("/updatePassword", authMiddleware, updatePasswordController);
//reset password
router.post("/resetPassword", authMiddleware, resetPasswordController);
//delete user
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);
module.exports = router;

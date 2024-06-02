const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
async function getUserController(req, res) {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User got successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get user API",
      error,
    });
  }
}
async function updateUserController(req, res) {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update API",
      error,
    });
  }
}
async function updatePasswordController(req, res) {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Usre Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
}
async function resetPasswordController(req, res) {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Plese provide all fileds",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found OR Invalid Password",
      });
    }
    var salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfull ",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Password Reset API",
      error,
    });
  }
}
async function deleteUserController(req, res) {
  try {
    console.log(req.params.id);
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
}
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
};

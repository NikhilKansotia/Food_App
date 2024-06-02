const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategroyController,
  deleteCategoryController,
} = require("../controllers/categoryControllers.js");
//routes
//Create category
router.post("/create", authMiddleware, createCategoryController);
//Get all category
router.get("/getAllcategory", getAllCategoryController);
//update category
router.put("/updateCategory/:id", authMiddleware, updateCategroyController);
//delete category
router.delete("/deleteCategory/:id", authMiddleware, deleteCategoryController);
module.exports = router;

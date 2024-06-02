const categoryModel = require("../models/categoryModel.js");

//create
async function createCategoryController(req, res) {
  try {
    const { title, ImageURL } = req.body;
    if (!title) {
      return res.status(500).send({
        success: true,
        message: "Please provide title",
      });
    }
    const category = await categoryModel.create({ title, ImageURL });
    res.status(201).send({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in create category API",
      error,
    });
  }
}
//get all
async function getAllCategoryController(req, res) {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }
    res.status(200).send({
      success: true,
      totalLength: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get all category API",
      error,
    });
  }
}
//update
async function updateCategroyController(req, res) {
  try {
    const categoryId = req.params.id;
    const { title, ImageURL } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      { title, ImageURL },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Categroy updated successfully ",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in update category API",
      error,
    });
  }
}
async function deleteCategoryController(req, res) {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(500).send({
        success: false,
        message: "No category found",
      });
    }
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).send({
        success: false,
        messaage: "Categroy not found",
      });
    }
    await categoryModel.findByIdAndDelete(categoryId);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in delete category API",
    });
  }
}
module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategroyController,
  deleteCategoryController,
};

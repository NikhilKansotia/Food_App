const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaunratController,
  getRestaurantByIdController,
  deleteResturantController,
} = require("../controllers/restaurantController");
const router = express.Router();

//routes
// create restaurant
router.post("/create", authMiddleware, createRestaurantController);
//get restaurants
router.get("/getAll", getAllRestaunratController);
//get by id
router.get("/get/:id", getRestaurantByIdController);
//delete
router.delete("/delete/:id", authMiddleware, deleteResturantController);
module.exports = router;

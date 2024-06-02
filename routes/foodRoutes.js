const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const adminMidlleware = require("../middlewares/adminMiddleware.js");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestaurantController,
  updateFoodByIdcontroller,
  delelteFoodByIdController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController.js");
const router = express.Router();

//rotues
// create food
router.post("/create", authMiddleware, createFoodController);
//get all food
router.get("/getAllFood", getAllFoodController);
//get food on the basis of id
router.get("/getFood/:id", authMiddleware, getFoodByIdController);
//get food by restaurant
router.get(
  "/getFoodByRestaurant/:id",
  authMiddleware,
  getFoodByRestaurantController
);
//update food
router.put("/updateFood/:id", authMiddleware, updateFoodByIdcontroller);
//delete food
router.delete("/deleteFood/:id", authMiddleware, delelteFoodByIdController);
// place order
router.post("/placeOrder", authMiddleware, placeOrderController);
// change order status
router.post(
  "/orderStatus/:id ",
  authMiddleware,
  adminMidlleware,
  orderStatusController
);
module.exports = router;

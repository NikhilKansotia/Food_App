const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel.js");
async function createFoodController(req, res) {
  try {
    const {
      title,
      description,
      price,
      ImageURL,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !price || !description || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newFood = await foodModel.create({
      title,
      description,
      price,
      ImageURL,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    res.status(201).send({
      success: true,
      message: "New food item created",
      newFood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in create food API",
    });
  }
}
async function getAllFoodController(req, res) {
  const foods = await foodModel.find({});
  if (!foods) {
    return res.status(404).send({
      success: false,
      message: "No food found",
    });
  }
  res.status(200).send({
    success: true,
    foods,
  });
}
async function getFoodByIdController(req, res) {
  const foodId = req.params.id;
  if (!foodId) {
    return res.status(500).send({
      success: false,
      message: "Please provide a foodId",
    });
  }
  const food = await foodModel.findById(foodId);
  if (!food) {
    return res.status(404).send({
      success: false,
      message: "Food not found",
    });
  }
  res.status(200).send({
    success: true,
    message: "Food found",
    food,
  });
}
async function getFoodByRestaurantController(req, res) {
  const restaurantId = req.params.id;
  if (!restaurantId) {
    return res.status(500).send({
      success: false,
      message: "Please provide a restaurant Id ",
    });
  }
  const food = await foodModel.find({ restaurant: restaurantId });
  if (!food) {
    return res.status(404).send({
      success: false,
      message: "Food not found",
    });
  }
  res.status(200).send({
    success: true,
    message: "Food found",
    food,
  });
}
async function updateFoodByIdcontroller(req, res) {
  const foodId = req.params.id;
  if (!foodId) {
    return res.status(500).send({
      success: false,
      message: "Please provide foodID",
    });
  }
  const food = await foodModel.findById(foodId);
  if (!food) {
    return res.status(404).send({
      success: false,
      message: "Food not found",
    });
  }
  const {
    title,
    description,
    price,
    ImageURL,
    foodTags,
    category,
    code,
    isAvailable,
    restaurant,
    rating,
    ratingCount,
  } = req.body;
  const updateFood = await foodModel.findByIdAndUpdate(
    foodId,
    {
      title,
      description,
      price,
      ImageURL,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    },
    { new: true }
  );
  res.status(200).send({
    success: true,
    message: "Food updated successfully",
  });
}
async function delelteFoodByIdController(req, res) {
  const foodId = req.params.id;
  if (!foodId) {
    return res.status(500).send({
      success: false,
      message: "Please provide foodID",
    });
  }
  const food = await foodModel.findById(foodId);
  if (!food) {
    return res.status(404).send({
      success: false,
      message: "Food not found",
    });
  }
  await foodModel.findByIdAndDelete(foodId);
  res.status(200).send({
    success: true,
    message: "Food deleted successfully",
  });
}
async function placeOrderController(req, res) {
  const { cart } = req.body;
  if (!cart) {
    return res.status(500).send({
      success: false,
      message: "Please provide cart and payment values",
    });
  }
  var total = 0;
  cart.map((food) => (total += food.price));
  const newOrder = await orderModel.create({
    food: cart,
    payment: total,
    buyer: req.body.id,
  });
  res.status(201).send({
    success: true,
    message: "Order placed successfully",
    newOrder,
  });
}
async function orderStatusController(res, res) {
  const orderId = req.params.id;
  const { status } = req.body;
  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  res.status(200).send({
    success: true,
    message: "Order Status updated successfully",
  });
}
module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestaurantController,
  updateFoodByIdcontroller,
  delelteFoodByIdController,
  placeOrderController,
  orderStatusController,
};

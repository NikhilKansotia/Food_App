const restaurantModel = require("../models/restaurantModel");

async function createRestaurantController(req, res) {
  try {
    const {
      title,
      imageURL,
      food,
      pickup,
      delivery,
      isOpen,
      logoURL,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Plese provide title and address",
      });
    }
    const newReastaurant = new restaurantModel({
      title,
      imageURL,
      food,
      pickup,
      delivery,
      isOpen,
      logoURL,
      ratingCount,
      code,
      coords,
    });
    await newReastaurant.save();
    res.status(201).send({
      success: true,
      message: "New Restaurant created successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in restaurant create API",
      error,
    });
  }
}
async function getAllRestaunratController(req, res) {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurants available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get all restaurant API",
      error,
    });
  }
}
async function getRestaurantByIdController(req, res) {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurant id",
      });
    }
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get restaurant by ID API",
      error,
    });
  }
}
async function deleteResturantController(req, res) {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
    }
    await restaurantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in delete resturant api",
      error,
    });
  }
}

module.exports = {
  createRestaurantController,
  getAllRestaunratController,
  getRestaurantByIdController,
  deleteResturantController,
};

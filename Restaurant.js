// models/Restaurant.js

const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountType: {
    type: String,
    required: true,
  },
  lat: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  long: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  logoImage: {
    type: String,
    required: true,
  },
  
  createdBy: {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);

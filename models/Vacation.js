const mongoose = require("mongoose");

const vacationSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    enum: ['accepted', 'rejected', 'pending'], 
    default: 'pending', 
    required: true,
  },
  createdBy: {
    email: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Vacation", vacationSchema);

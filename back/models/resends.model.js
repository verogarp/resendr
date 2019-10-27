const mongoose = require('mongoose');

const resendSchema = new mongoose.Schema({
  fromUser: {
    type: String,
    required: [true,"from user is required"]
  },
  destinationUser: {
    type: String,
    required: [true,"destination user is required"]
  },
  fromLocation:{
    type: String,
    required: [true, "from location is required"]
  },
  destinationLocation:{
    type: String,
    required: [true, "destination location is required"]
  },
  price:{
    type: Number,
    required: [true, "price is required"]
  },
  date: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "bought", "resend","confirm"],
  },
  packageSize: {
    type: String,
    enum: ["small", "medium", "large","extraLarge"],
  },
  fragile: {
    type: Boolean,
  }
});

const resendModel = mongoose.model('resend', resendSchema);

module.exports = resendModel;

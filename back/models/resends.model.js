const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resendSchema = new mongoose.Schema({
  fromUser: {
    type: Schema.Types.ObjectId, 
    ref: "user",
    required: [true,"fromUser is required"]
  },
  destinationUser: {
    type: Schema.Types.ObjectId, 
    ref: "user",
    required: [true,"destination user is required"]
  },
  fromLocation:{
    type: Object,
    required: [true, "from location is required"]
  },
  destinationLocation:{
    type: Object,
    required: [true, "destination location is required"]
  },
  /*price:{
    type: Number,
    required: [false, "price is required"]
  },*/
  date: {
    type: Date,
    required: [true, "date is required"]
  },
  status: {
    type: String,
    enum: ["pending", "bought", "resend","confirmed"],
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

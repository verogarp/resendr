const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [10, "10 characters minimum"],
    required: true,
  },
  price: {
    type: Number,
    min: 1,
    required: true
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  occupied: {
    type: Boolean,
    default: false,
    required: true
  },
  // Example of One-to-One Relationship
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  // Example of One-to-Many Relationships
  tenants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  },
});

const homeModel = mongoose.model('home', homeSchema);
module.exports = homeModel;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator(value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
      }
    },
    unique: [true, "This is email is registered"]
  },
  role: {
    type: String,
    enum: ["host", "regular"],
    required: true,
    default: "regular"
  },
  birthDate: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

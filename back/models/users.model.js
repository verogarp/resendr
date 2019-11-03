const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator(value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          value
        );
      }
    },
    unique: [true, "This is email is registered"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },

  location: {
    type: Object,
    required: [true, "Location is required"]
  },

  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  },

  resends: {
    type: Number
  },

  resentTypes: {
    type: Number
  }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

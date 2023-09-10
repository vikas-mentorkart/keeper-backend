const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    requried: false,
  },
  accountActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "USER",
    required: true,
  },
  notes: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        requried: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("users", UsersSchema);

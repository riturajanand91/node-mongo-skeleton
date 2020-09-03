const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: Number,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", usersSchema); //here User is the schema name
module.exports = Users;

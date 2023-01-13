const mongoose = require("mongoose");
const { formatDate } = require("../helpers/formatDate");

const ClientSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    minlength: 3,
    maxLength: 140,
  },

  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 3,
    maxLength: 140,
  },

  phone: {
    type: String,
    require: true,
    trim: true,
    maxLength: 25,
  },

  address: {
    type: String,
    require: true,
    trim: true,
    minlength: 1,
    maxLength: 140,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    require: true,
  },

  updatedAt: {
    type: String,
    default: formatDate(Date.now()),
    require: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = Client = mongoose.model("Client", ClientSchema);

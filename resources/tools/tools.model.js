const mongoose = require("mongoose");

const { Schema } = mongoose;
const ToolSchema = Schema({
  tool: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },

  avatar: {
    type: String,
  },

  rent: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const ToolModel = mongoose.model("Tool", ToolSchema);
module.exports = ToolModel;

const mongoose = require("mongoose");

const { Schema } = mongoose;
const UserSchema = Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
  avatar: {
    type: String,
  },

  phone: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    minlength: 3,
    maxlength: 50,
    default: "user",
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 80,
  },
  address: {
    type: String,
    required: false,
    minlength: 8,
    maxlength: 14,
  },
  // companyWebsite: {
  //   type: String,
  //   required: false,
  //   minlength: 8,
  //   maxlength: 50,
  // },
  // resetPasswordToken: String,
  // resetPasswordExpires: Date,
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

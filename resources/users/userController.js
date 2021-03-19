const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const validation = require("./user.validation");
const Users = require("./users.model");
const AuthHelper = require("./auth");
const { genSaltSync, hashSync } = bcrypt;

const register = async (req, res) => {
  console.log("req file", req.file);
  try {
    const { error } = validation.validateUser(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }

    const { firstName, lastName, email, phone, password } = req.body;
    const userExist = await Users.findOne({ email });
    const avatar = req.file.path.replace(/\\/g, "/");

    if (userExist) {
      return res.status(409).json({
        status: 409,
        message: "user already exist",
      });
    }

    // Insert a new user
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    // ImageModel.findOne({id})
    const user = new Users({
      firstName,
      phone,
      lastName,
      email,
      avatar,
      password,
    });
    await user.save();
    const userDetails = AuthHelper.Auth.toAuthJSON(user);
    return res.status(200).json({
      message: "success",
      user: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = validation.validateLogin(req.body);

    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        status: 400,
        message: "invalid email or password",
      });
    }

    const userPassword = await bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!userPassword) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    return res.status(200).json({
      message: "Logged in successfully",
      user: AuthHelper.Auth.toAuthJSON(existingUser),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Could not login user",
    });
  }
};

module.exports = {
  register,
  login,
};

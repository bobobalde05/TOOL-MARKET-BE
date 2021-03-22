const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const validation = require("./user.validation");
const Users = require("./users.model");
const AuthHelper = require("./auth");
const { genSaltSync, hashSync } = bcrypt;

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, address } = req.body;
    const userExist = await Users.findOne({ email });
    const avatar = req.file.path.replace(/\\/g, "/");

    if (userExist) {
      return res.status(409).json({
        status: 409,
        message: "user already exist",
      });
    }

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt); //hash user password

    // Insert a new user
    const user = new Users({
      firstName,
      phone,
      lastName,
      email,
      avatar,
      address,
      password: hash,
    });

    const newUser = await user.save();
    return res.status(200).json({
      message: "success",
      newUser,
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
      return res.status(404).json({
        status: 404,
        message: "invalid email or password",
      });
    }

    // const userPassword = await bcrypt.compareSync(
    //   password,
    //   existingUser.password
    // );

    if (password !== existingUser.password) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Logged in successfully",
      user: existingUser,
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

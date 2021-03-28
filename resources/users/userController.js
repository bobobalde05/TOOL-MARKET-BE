const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const validation = require("./user.validation");
const Users = require("./users.model");
const { genSaltSync, hashSync } = bcrypt;

const register = async (req, res) => {
  try {
    //pull out register parameters from request body
    const { firstName, lastName, email, phone, password, address } = req.body;

    //check if user exists in the database already to avoid duplicate signup
    const userExist = await Users.findOne({ email });

    //regex to replace backslash with forward slash in file path
    const avatar = req.file.path.replace(/\\/g, "/");

    //error message when user exists
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

    //save new user
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
    //input validation
    const { error } = validation.validateLogin(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }

    //destructure email and password from request body
    const { email, password } = req.body;

    //check if user exists in the database
    const existingUser = await Users.findOne({ email });

    //return an error message if user does not existy in the database
    if (!existingUser) {
      return res.status(404).json({
        status: 404,
        message: "invalid email or password",
      });
    }

    //check if user account is active or suspended
    if (existingUser.active === "suspended") {
      return res.status(403).json({
        status: 403,
        message: "Account suspended",
      });
    }
    //check if user provided password matches user's hashed password in database
    const userPassword = await bcrypt.compareSync(
      password,
      existingUser.password
    );
    //return an error message if password is not valid
    if (!userPassword) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    //response upon successful login
    return res.status(200).json({
      status: 200,
      message: "Logged in successfully",
      user: existingUser,
    });
  } catch (error) {
    //catch error
    return res.status(500).json({
      message: error.message || "Could not login user",
    });
  }
};

const getUsers = (req, res) => {
  try {
    Users.find({ userType: "user" }, (err, users) => {
      if (users.length === 0) {
        return res.status(404).json({
          message: "no users found",
        });
      }

      return res.status(200).json({
        message: `${users.length} user(s) found`,
        users,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};

const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Users.findOne({ _id: id }, function (err, result) {
      if (!result) {
        return res.sendStatus(404).json({
          message: "user not found",
        });
      }
    });

    const updateUser = await Users.updateOne(
      { _id: id },
      { $set: { status: status } }
    );
    if (updateUser) {
      return res.status(200).json({
        message: "User status updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  updateUserStatus,
};

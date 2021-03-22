const bcrypt = require("bcryptjs");
const Tools = require("./tools.model");
const { genSaltSync, hashSync } = bcrypt;

const postTool = async (req, res) => {
  try {
    const { tool, phone, rent, available } = req.body;

    const avatar = req.file.path.replace(/\\/g, "/");

    // Insert a new tool
    const toolToAdd = new Users({
      tool,
      phone,
      rent,
      available,
      avatar,
    });

    const newTool = await toolToAdd.save();
    return res.status(200).json({
      message: "success",
      newTool,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error,
    });
  }
};

module.exports = {
  postTool,
};

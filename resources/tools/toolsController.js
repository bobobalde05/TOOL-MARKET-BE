const bcrypt = require("bcryptjs");
const Tools = require("./tools.model");

const postTool = async (req, res) => {
  try {
    const { tool, phone, rent } = req.body;

    const avatar = req.file.path.replace(/\\/g, "/");
    // Insert a new tool
    const toolToAdd = new Tools({
      tool,
      phone,
      rent,
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

const getTools = (req, res) => {
  try {
    Tools.find({ available: true }, (err, tools) => {
      if (tools.length === 0) {
        return res.status(404).json({
          message: "no tools found",
        });
      }

      return res.status(200).json({
        message: `${tools.length} Toolss(s) found`,
        tools,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};

const updateTool = async (req, res) => {
  const { id } = req.params;

  try {
    await Tools.findOne({ _id: id }, function (err, result) {
      if (!result) {
        return res.sendStatus(404).json({
          message: "tool not found",
        });
      }
    });

    const updateTool = await Tools.updateOne(
      { _id: id },
      { $set: { available: false } }
    );
    if (updateTool) {
      return res.status(200).json({
        message: "Borrow request sent",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};

module.exports = {
  postTool,
  getTools,
  updateTool,
};

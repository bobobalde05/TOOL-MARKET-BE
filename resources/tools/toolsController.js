const bcrypt = require("bcryptjs");
const Tools = require("./tools.model");

const postTool = async (req, res) => {
  try {
    const { tool, phone, rent } = req.body;

    const avatar = req.file.path.replace(/\\/g, "/");
    console.log("req.body", req.file);
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
    Tools.find({}, (err, tools) => {
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

module.exports = {
  postTool,
  getTools,
};

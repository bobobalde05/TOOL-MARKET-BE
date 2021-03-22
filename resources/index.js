const express = require("express");

const mainRouter = express.Router();

const users = require("./users/user.routes");
const tools = require("./tools/tools.routes");

mainRouter.use("/api/v1/users", users);
mainRouter.use("/api/v1/tools", tools);

module.exports = mainRouter;

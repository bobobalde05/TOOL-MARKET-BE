require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./database");

const resources = require("./resources");
const expressMiddlewares = require("./utils/middlewares");

const app = express();

expressMiddlewares(app);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(resources);

connectDB();

app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      message: "welcome to Tools Market",
    });
  } catch (error) {
    next(new Error(error));
  }
});

module.exports = app;

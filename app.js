require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./database");

const resources = require("./resources");
const expressMiddlewares = require("./utils/middlewares");

const app = express(); //instance of express

expressMiddlewares(app);

// body parser
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(resources);

//invoke connection to database
connectDB();

// Home route
app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      message: "welcome to Tools Market",
    });
  } catch (error) {
    next(new Error(error));
  }
});

// expose app
module.exports = app;

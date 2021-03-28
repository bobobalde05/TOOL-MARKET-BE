const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const expressMiddlewares = (app) => {
  app.use(cors()); // enable the express server to respond to preflight requests
  app.use(express.json()); // recognize incoming Request Object as a JSON Object
  app.use(express.urlencoded({ extended: false })); //parses both json and urlencoded
  app.use(morgan("combined"));
  app.use(helmet());
};

module.exports = expressMiddlewares;

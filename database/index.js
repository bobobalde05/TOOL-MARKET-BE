/* eslint-disable no-console */
const mongoose = require("mongoose");

const { connectionUrl } = require("../config/dbConfig");

mongoose.set("useCreateIndex", true);

module.exports = async () => {
  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Tools",
    });
    console.log("Connected to Database");
  } catch (e) {
    console.log(`Connection to database failed: ${e.message}`);
  }
};

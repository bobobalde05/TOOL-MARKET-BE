const dotenv = require("dotenv");

dotenv.config();

let connectionUrl =
  "mongodb+srv://muyiwa:muyiwa@Cluster0.v54aq.mongodb.net/Tools?retryWrites=true&w=majority";

module.exports = { connectionUrl };

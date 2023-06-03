const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.mongo_address);
module.exports = { connection };

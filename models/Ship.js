const mongoose = require("mongoose");
const shipSchema = new mongoose.Schema({
  name: String,
  engineType: String,
  capacity: Number
});

module.exports = mongoose.model("Ship", shipSchema);

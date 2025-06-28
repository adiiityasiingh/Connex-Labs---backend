const mongoose = require("mongoose");

const fuelLogSchema = new mongoose.Schema({
  voyageId: mongoose.Schema.Types.ObjectId,
  timestamp: Date,
  fuelUsed: Number
});

module.exports = mongoose.model("FuelLog", fuelLogSchema);

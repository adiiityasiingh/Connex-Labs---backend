const mongoose = require("mongoose");

const voyageSchema = new mongoose.Schema({
  shipId: mongoose.Schema.Types.ObjectId,
  origin: String,
  destination: String,
  cargo: Number,
  weather: String,
  departureTime: Date,
  plannedETA: Date,
  plannedFuel: Number,
  actualETA: Date,
  actualFuel: Number,
  deviations: String
});

module.exports = mongoose.model("Voyage", voyageSchema);

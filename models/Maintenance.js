const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  shipId: mongoose.Schema.Types.ObjectId,
  lastServiced: Date,
  predictedNextMaintenance: Date,
  issuesDetected: String
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);

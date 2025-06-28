require("dotenv").config();
const mongoose = require("mongoose");
const Maintenance = require("../models/Maintenance");

const MONGO_URI = process.env.MONGO_URI;

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const shipIds = [
      "666000000000000000000001", // Mock ObjectIds
      "666000000000000000000002",
      "666000000000000000000003"
    ];

    const seedData = shipIds.map((id, i) => ({
      shipId: id,
      lastServiced: new Date(Date.now() - (i + 2) * 20 * 24 * 60 * 60 * 1000),
      predictedNextMaintenance: new Date(Date.now() + (i + 1) * 10 * 24 * 60 * 60 * 1000),
      issuesDetected: i % 2 === 0 ? "None" : "Minor engine wear"
    }));

    await Maintenance.insertMany(seedData);
    console.log("Mock maintenance records seeded.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

run();

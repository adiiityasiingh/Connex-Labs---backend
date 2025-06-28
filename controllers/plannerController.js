const Voyage = require("../models/Voyage");
const Maintenance = require("../models/Maintenance");
const axios = require("axios");
// 1. POST /plan-voyage
exports.planVoyage = async (req, res) => {
  const { origin, destination, departureTime, cargo, weather } = req.body;
  try {
    console.log("📡 Calling ML /predict-plan...");
    const mlResponse = await axios.post("http://host.docker.internal:6000/predict-plan", {
      origin,
      destination,
      cargo,
      weather
    });

    const { estimated_eta, expected_fuel, speed_schedule } = mlResponse.data;

    const voyage = new Voyage({
      origin,
      destination,
      cargo,
      weather,
      departureTime,
      plannedETA: estimated_eta,
      plannedFuel: expected_fuel
    });

    await voyage.save();

    res.json({
      message: "Voyage plan generated successfully.",
      eta: estimated_eta,
      fuel: expected_fuel,
      speedSchedule: speed_schedule
    });
  } catch (err) {
    console.error("❌ Error in ML /predict-plan:", err.message);
    if (err.response?.data) {
      console.error("📦 ML Error Response:", err.response.data);
    }
    res.status(500).json({ error: "AI planning service failed." });
  }
  
};
// 2. GET /plan-history
exports.getPlanHistory = async (req, res) => {
  const history = await Voyage.find().sort({ departureTime: -1 });
  res.json(history);
};
// 3. POST /feedback
exports.saveFeedback = async (req, res) => {
  const { voyageId, actualETA, actualFuel, deviations } = req.body;

  const voyage = await Voyage.findById(voyageId);
  if (!voyage) return res.status(404).json({ message: "Voyage not found" });

  voyage.actualETA = actualETA;
  voyage.actualFuel = actualFuel;
  voyage.deviations = deviations;
  await voyage.save();

  res.json({ message: "Feedback saved", voyage });
};
// 4. GET /maintenance-alerts
exports.getMaintenanceAlerts = async (req, res) => {
  const maintenanceLogs = await Maintenance.find();

  const enriched = await Promise.all(
    maintenanceLogs.map(async (log) => {
      try {
        const result = await axios.post("http://mlservice:6000/predict-maintenance", {
          last_serviced: log.lastServiced.toISOString().split("T")[0],
          usage_days: 60,
          engine_hours: 400 // Mock values for now
        });

        return {
          ...log._doc,
          predictedFromModel: result.data.predicted_next_maintenance,
          riskLevel: result.data.risk_level
        };
      } catch (err) {
        return { ...log._doc, modelError: true };
      }
    })
  );

  res.json(enriched);
};


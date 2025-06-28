const express = require("express");
const router = express.Router();
const planner = require("../controllers/plannerController");

// Route: POST /plan-voyage
router.post("/plan-voyage", planner.planVoyage);

// Route: GET /plan-history
router.get("/plan-history", planner.getPlanHistory);

// Route: POST /feedback
router.post("/feedback", planner.saveFeedback);

// Route: GET /maintenance-alerts
router.get("/maintenance-alerts", planner.getMaintenanceAlerts);

module.exports = router;

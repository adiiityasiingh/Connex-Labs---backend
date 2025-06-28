# 💭 THOUGHTS.md – Bonus Challenge Responses
## 1. 🌩️ How would you handle **route planning with dynamic weather updates**?

- Integrate a real-time weather API (e.g., OpenWeatherMap Marine, NOAA) that pushes updates to the system every hour.
- Build a background worker (e.g., using Node.js cron or BullMQ) to periodically fetch weather data.
- If significant changes are detected, re-run the voyage planner AI to re-calculate ETA and fuel use.
- Notify operators if route adjustments are needed.

## 2. 🌐 How to incorporate **real-time sensor data from ships**?

- Deploy IoT agents on ships to send telemetry data (engine temp, RPM, fuel consumption) via MQTT/HTTP to a cloud gateway.
- Store this time-series data in a dedicated collection like `SensorLogs` or in a time-series DB (e.g., InfluxDB).
- Trigger maintenance forecasts based on live metrics like vibration, engine hours, temperature anomalies.
- Optionally, visualize in a Grafana dashboard.

## 3. 🚢 What model architecture to scale across 500 vessels?

- Use a microservices architecture: separate APIs for planning, maintenance, and feedback.
- Containerize AI models with RESTful interfaces (already done here).
- Store ship-specific configs and training history using shipId.
- Train fleet-wide models for generic patterns and fine-tune per-ship models as needed.
- Deploy AI models on edge devices (for ships with connectivity) using TensorFlow Lite or ONNX.

## 4. 🔄 How would you add continuous learning?

- Store voyage feedback from `/api/feedback` into a `Feedback` collection.
- Periodically retrain the ML models using this feedback (e.g., daily or weekly).
- Use a background job to retrain lightweight models (like linear regression) and save updated coefficients.
- Optionally deploy a model registry (e.g., MLflow) to manage versions.

---

These thoughts aim to scale the system from a prototype to a production-grade AI-powered marine planning system.

– Aditya Singh
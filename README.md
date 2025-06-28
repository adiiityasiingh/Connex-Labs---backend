# ⚓️ AI-Powered Ship Planning & Optimization System

This backend service acts as the "Planning Brain" of a smart ship. It uses machine learning to optimize voyages, fuel usage, and maintenance schedules for commercial vessels.

## 🧠 Features

- 📦 Predicts efficient voyage plans (ETA, fuel use, speed profile)
- ⛽ AI-powered fuel consumption prediction
- 🔧 Forecasts proactive maintenance using usage logs
- 📈 Learns from voyage feedback (continuous improvement loop)
- 🐳 Fully Dockerized with ML microservice

---

## 🧪 API Endpoints

### `POST /api/plan-voyage`
**Body:**
```json
{
  "origin": "Singapore",
  "destination": "Rotterdam",
  "departureTime": "2025-07-01T08:00:00Z",
  "cargo": 1500,
  "weather": "Moderate"
}
```

**Returns:**
- ETA (calculated by ML)
- Fuel estimate
- Speed schedule

---

### `GET /api/plan-history`
Returns list of past voyage plans.

---

### `POST /api/feedback`
Accepts actual values (fuel used, time taken) for learning.

---

### `GET /api/maintenance-alerts`
Returns list of ships with predicted next maintenance date and risk level.

---

## 🧠 AI Models

- **Voyage Planner**: Predicts ETA & fuel use from cargo, weather, and distance.
- **Maintenance Forecaster**: Predicts next maintenance using usage logs.
- **Speed Profile**: Suggests an average speed schedule.

Built using Flask and served as a separate Docker container.

---

## 🐳 Running the App (Docker)

1. Build and start all services:
```bash
docker-compose up --build
```

2. Access backend:
```bash
http://localhost:5000
```

3. Access ML service directly (for testing):
```bash
http://localhost:6000
```

---

## 🧰 Dev Setup (Local)

1. Install dependencies
```bash
npm install
cd ml-service && pip install -r requirements.txt
```

2. Set up `.env` based on `.env.example`

3. Run backend:
```bash
npm run dev
```

4. Run ML service:
```bash
cd ml-service
python app.py
```

---

## 📂 Project Structure

```
/backend
  /controllers
  /models
  /routes
  server.js
/ml-service
  app.py
  Dockerfile
docker-compose.yml
README.md
.env.example
```

---

## 🧠 Thought Notes

For scaling, dynamic weather updates, and real-time ship sensor integration, see `THOUGHTS.md`.

---

## 👨‍💻 Author

Aditya Singh – Backend Developer Assignment for Connex Labs
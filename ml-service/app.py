from flask import Flask, request, jsonify
from datetime import datetime, timedelta
import random

app = Flask(__name__)

@app.route('/predict-maintenance', methods=['POST'])
def predict_maintenance():
    data = request.get_json()

    usage_days = data.get("usage_days", 60)
    engine_hours = data.get("engine_hours", 300)
    last_serviced = datetime.strptime(data.get("last_serviced"), "%Y-%m-%d")

    # Mock logic: heavier usage → sooner maintenance
    usage_factor = (engine_hours / usage_days)
    days_until_next = max(10, 90 - usage_factor)

    predicted_date = last_serviced + timedelta(days=days_until_next)

    return jsonify({
        "predicted_next_maintenance": predicted_date.strftime("%Y-%m-%d"),
        "risk_level": "high" if usage_factor > 6 else "medium" if usage_factor > 4 else "low"
    })


@app.route('/predict-plan', methods=['POST'])
def predict_plan():
    data = request.get_json()

    origin = data.get("origin")
    destination = data.get("destination")
    cargo = data.get("cargo")
    weather = data.get("weather")

    # Mock base distance (you can add haversine later)
    base_distance = 1200  # in nautical miles

    # Weather factor
    weather_delay = {
        "Clear": 0,
        "Moderate": 6,
        "Storm": 12
    }

    # Estimate ETA (naive logic)
    hours = base_distance / 20 + weather_delay.get(weather, 6)  # 20 knots speed avg
    predicted_eta = datetime.now() + timedelta(hours=hours)

    # Estimate fuel usage (mock linear formula)
    fuel = (base_distance * 0.05) + (cargo * 0.3)

    return jsonify({
        "estimated_eta": predicted_eta.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "expected_fuel": round(fuel, 2),
        "speed_schedule": [18, 20, 19, 21]  # simple sample
    })


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6000)

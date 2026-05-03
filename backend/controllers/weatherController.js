// import axios from 'axios'; // Using native fetch
import Notification from '../models/Notification.js';

// @desc    Get Weather Data (Live with Mock Fallback)
// @route   GET /api/weather
// @access  Public (or Private if using user location)
export const getWeather = async (req, res) => {
  const city = req.query.city || 'Pune';
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    let weatherData;

    if (apiKey && apiKey !== 'your_openweather_key_here') {
      // Encode city to handle spaces/special characters
      const query = encodeURIComponent(city);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('OpenWeather Error:', data);
        throw new Error(data.message || 'City not found or API error');
      }

      weatherData = {
        location: `${data.name}, ${data.sys.country}`,
        temperature: Math.round(data.main.temp),
        unit: "Celsius",
        humidity: data.main.humidity,
        rainfall: data.rain ? `${data.rain['1h'] || 0}mm` : "0mm",
        soilMoisture: "34%", // Mocked as it's not in standard free API
        windSpeed: `${Math.round(data.wind.speed * 3.6)} km/h`,
        forecast: data.weather[0].main,
        condition: data.weather[0].description,
        icon: data.weather[0].icon,
        alerts: data.main.temp > 35 ? "High heat alert! Ensure proper irrigation." : "Ideal conditions for farming."
      };
    } else {
      // Fallback Mock Data
      weatherData = {
        location: `${city}, India (Demo Mode)`,
        temperature: 28,
        unit: "Celsius",
        humidity: 65,
        rainfall: "0.5mm",
        soilMoisture: "34%",
        windSpeed: "12 km/h",
        forecast: "Partly Cloudy",
        condition: "scattered clouds",
        icon: "03d",
        alerts: "No major alerts for next 24 hours. Ideal for sowing."
      };
    }

    // Smart Notification Logic (Example: if it's hot or raining)
    if (req.user && weatherData.temperature > 30) {
      const existingNotif = await Notification.findOne({
        user: req.user._id,
        title: 'Heat Alert',
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24h
      });

      if (!existingNotif) {
        await Notification.create({
          user: req.user._id,
          title: 'Heat Alert',
          message: `Temperature in ${city} is currently ${weatherData.temperature}°C. Stay hydrated and monitor soil moisture.`,
          type: 'Weather'
        });
      }
    }

    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({ message: 'Error fetching weather data', error: error.message });
  }
};

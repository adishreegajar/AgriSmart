import Crop from '../models/Crop.js';

// @desc    Get Weather Data (Mock)
// @route   GET /api/weather
// @access  Public
export const getWeather = async (req, res) => {
  try {
    // Realistic Indian farming region values (e.g., Punjab/Haryana)
    const weatherData = {
      location: "Ludhiana, Punjab",
      temperature: 28,
      unit: "Celsius",
      humidity: 65,
      rainfall: "12mm",
      soilMoisture: "34%",
      windSpeed: "12 km/h",
      forecast: "Partly Cloudy",
      alerts: "No major alerts for next 24 hours. Ideal for sowing."
    };

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Government Schemes (Mock)
// @route   GET /api/schemes
// @access  Public
export const getSchemes = async (req, res) => {
  try {
    const schemes = [
      {
        id: 1,
        name: "PM-Kisan Samman Nidhi",
        category: "Direct Benefit Transfer",
        eligibility: "Small and marginal farmers holding up to 2 hectares of land.",
        benefits: "₹6,000 per year in three equal installments.",
        deadline: "Ongoing"
      },
      {
        id: 2,
        name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        category: "Crop Insurance",
        eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops.",
        benefits: "Insurance coverage and financial support in the event of failure of any of the notified crop.",
        deadline: "July 31, 2026 (Kharif)"
      },
      {
        id: 3,
        name: "Soil Health Card Scheme",
        category: "Soil Welfare",
        eligibility: "All farmers are eligible to get their soil tested.",
        benefits: "Provides information on nutrient status of their soil along with recommendations on appropriate dosage of nutrients.",
        deadline: "N/A"
      }
    ];

    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Dashboard Summary (Real + Dynamic Mock)
// @route   GET /api/data/dashboard
// @access  Private (Farmer)
export const getDashboardSummary = async (req, res) => {
  try {
    const activeCropsCount = await Crop.countDocuments({ farmer: req.user._id, status: 'Available' });
    const soldCrops = await Crop.find({ farmer: req.user._id, status: 'Sold' });
    
    // Calculate real aggregation
    const totalEarningsValue = soldCrops.reduce((sum, crop) => sum + (crop.price || 0), 0);
    const totalQuantitySoldValue = soldCrops.length;

    // Dynamic AI Decision Support based on location/conditions
    const location = req.user.location?.toLowerCase() || "north india";
    let recommendation = {
      crop: "Mixed Crops",
      confidence: "80%",
      reason: "Monitor local humidity levels to prevent fungal infections."
    };

    if (location.includes('punjab') || location.includes('haryana')) {
      recommendation = {
        crop: "Wheat",
        confidence: "95%",
        reason: "Excellent temperature for final-stage grain maturing. Withhold irrigation to accelerate drying."
      };
    } else if (location.includes('kerala') || location.includes('south')) {
      recommendation = {
        crop: "Rubber/Coconut",
        confidence: "88%",
        reason: "High humidity levels detected. Ideal for tapping, but watch for premature fruit drop."
      };
    } else if (location.includes('maharashtra') || location.includes('pune')) {
      recommendation = {
        crop: "Sugarcane / Cotton",
        confidence: "91%",
        reason: "Stable temperatures in the Deccan plateau. Ensure drip irrigation lines are fully operational to conserve moisture."
      };
    } else if (soldCrops.length > 0) {
      // Dynamic fallback based on their most recently sold crop
      const topCrop = soldCrops[0].cropName;
      recommendation = {
        crop: topCrop,
        confidence: "85%",
        reason: `Based on your recent sale of ${topCrop}, soil restructuring is recommended before the next sowing cycle.`
      };
    }

    const dashboardData = {
      cropPrices: [
        { name: "Wheat", price: "₹2,275/q", trend: "up" },
        { name: "Rice (Basmati)", price: "₹4,100/q", trend: "down" },
        { name: "Mustard", price: "₹5,450/q", trend: "up" }
      ],
      salesSummary: {
        totalEarnings: `₹${totalEarningsValue.toLocaleString()}`,
        totalQuantitySold: `${totalQuantitySoldValue} Items`,
        activeListings: activeCropsCount
      },
      aiRecommendation: recommendation,
      demandTrend: [
        { month: "Jan", demand: 45 },
        { month: "Feb", demand: 52 },
        { month: "Mar", demand: 88 },
        { month: "Apr", demand: 75 }
      ]
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get AI Recommendation (Rule-based)
// @route   GET /api/recommendations
// @access  Public
export const getRecommendation = async (req, res) => {
  const { city, temp, humidity, soilType, season } = req.query;

  try {
    // Default recommendation
    let recommendation = {
      crop: "Mustard",
      confidence: "82%",
      reason: "Commonly grown in varied conditions, but optimal for cool, dry climates.",
      care: "Ensure moderate irrigation and watch for aphids."
    };

    const temperature = parseInt(temp) || 28;
    const hum = parseInt(humidity) || 60;
    const soil = soilType?.toLowerCase() || 'alluvial';
    const period = season?.toLowerCase() || 'kharif';

    // Enhanced logic based on multiple factors
    if (period === 'rabi') {
      if (temperature < 22 && soil === 'alluvial') {
        recommendation = {
          crop: "Wheat",
          confidence: "98%",
          reason: "Perfect balance of cool climate and fertile alluvial soil for Rabi season.",
          care: "Requires 4-6 irrigations during critical growth stages."
        };
      } else if (soil === 'black') {
        recommendation = {
          crop: "Chickpea (Gram)",
          confidence: "95%",
          reason: "Black soil retains moisture well, ideal for rain-fed pulse crops in winter.",
          care: "Avoid over-watering to prevent wilt disease."
        };
      }
    } else if (period === 'kharif') {
      if (hum > 70 && temperature > 25) {
        recommendation = {
          crop: "Rice (Paddy)",
          confidence: "96%",
          reason: "High humidity and temperature during Kharif are ideal for water-intensive paddy.",
          care: "Maintain 5cm standing water during the first month."
        };
      } else if (soil === 'red' || soil === 'sandy') {
        recommendation = {
          crop: "Groundnut",
          confidence: "90%",
          reason: "Well-drained red or sandy soils are excellent for pegging and pod development.",
          care: "Apply gypsum for better pod filling."
        };
      } else if (temperature > 30 && hum < 60) {
        recommendation = {
          crop: "Maize (Corn)",
          confidence: "88%",
          reason: "Drought-tolerant nature of maize makes it suitable for moderate humidity and high heat.",
          care: "Uniform moisture is crucial during the silking stage."
        };
      }
    } else {
      // Zaid or other
      recommendation = {
        crop: "Watermelon / Cucumber",
        confidence: "92%",
        reason: "Zaid season heat facilitates high sugar content in fruit crops.",
        care: "Requires frequent light irrigation and sandy soil."
      };
    }

    res.status(200).json(recommendation);
  } catch (error) {
    console.error('Recommendation Error:', error);
    res.status(500).json({ message: 'Error generating recommendation' });
  }
};

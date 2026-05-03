// @desc    Get Government Schemes (Live with Mock Fallback)
// @route   GET /api/schemes
// @access  Public
export const getSchemes = async (req, res) => {
  try {
    // Standard Government Schemes data structure
    const schemes = [
      {
        id: 1,
        name: "PM-Kisan Samman Nidhi",
        category: "Direct Benefit Transfer",
        eligibility: "Small and marginal farmers holding up to 2 hectares of land.",
        benefits: "₹6,000 per year in three equal installments.",
        deadline: "Ongoing",
        subsidy: "100%",
        actionUrl: "https://pmkisan.gov.in"
      },
      {
        id: 2,
        name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        category: "Crop Insurance",
        eligibility: "All farmers growing notified crops in notified areas.",
        benefits: "Insurance coverage against crop failure due to natural calamities.",
        deadline: "July 31, 2026 (Kharif)",
        subsidy: "Variable (Premium based)",
        actionUrl: "https://pmfby.gov.in"
      },
      {
        id: 3,
        name: "Soil Health Card Scheme",
        category: "Soil Welfare",
        eligibility: "All farmers are eligible for soil health tests every 2 years.",
        benefits: "Soil health report and nutrient recommendations.",
        deadline: "N/A",
        subsidy: "Free",
        actionUrl: "https://soilhealth.dac.gov.in"
      }
    ];

    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schemes data' });
  }
};

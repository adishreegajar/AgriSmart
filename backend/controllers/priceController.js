import Notification from '../models/Notification.js';

// @desc    Get Crop Prices (Live GOI with Mock Fallback)
// @route   GET /api/crop-prices
// @access  Public
export const getCropPrices = async (req, res) => {
  const apiKey = process.env.DATA_GOV_IN_API_KEY;

  try {
    let pricesData;

    if (apiKey && apiKey !== 'your_data_gov_in_key_here') {
      // In a real scenario, this would be a specific search query to data.gov.in
      // For this implementation, we simulate the structure of their JSON response
      const response = await fetch(
        `https://api.data.gov.in/resource/9ef273e5-7f5d-446d-8fb2-e2410a08e6/f?api-key=${apiKey}&format=json&limit=10`
      );
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('Price API Error');
      }

      // Transform GOI data to our format
      pricesData = data.records.map(record => ({
        name: record.commodity,
        price: `₹${record.modal_price}/q`,
        market: `${record.market}, ${record.district}, ${record.state}`,
        date: record.arrival_date,
        trend: Math.random() > 0.5 ? 'up' : 'down' // Trend isn't usually in raw gov data
      }));
    } else {
      // Fallback Professional Mock Data
      pricesData = [
        { name: "Wheat", price: "₹2,275/q", market: "Khanna, Ludhiana, Punjab", date: "03/04/2026", trend: "up" },
        { name: "Rice (Basmati)", price: "₹4,100/q", market: "Karnal, Haryana", date: "03/04/2026", trend: "down" },
        { name: "Onion", price: "₹1,850/q", market: "Lasalgaon, Nashik, Maharashtra", date: "03/04/2026", trend: "up" },
        { name: "Tomato", price: "₹2,400/q", market: "Kolar, Karnataka", date: "03/04/2026", trend: "up" },
        { name: "Soybean", price: "₹4,650/q", market: "Indore, Madhya Pradesh", date: "03/04/2026", trend: "down" }
      ];
    }

    // Smart Notification Example: if price is very high/low
    if (req.user && pricesData.some(p => p.name === 'Wheat' && parseInt(p.price.replace('₹', '')) > 2200)) {
      const existingNotif = await Notification.findOne({
        user: req.user._id,
        title: 'Price Alert',
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      });

      if (!existingNotif) {
        await Notification.create({
          user: req.user._id,
          title: 'Market Price Surge',
          message: 'Wheat prices have crossed ₹2,200/q in North Indian markets. Consider listing your harvest now.',
          type: 'Price'
        });
      }
    }

    res.status(200).json(pricesData);
  } catch (error) {
    console.error('Price API Error:', error.message);
    res.status(500).json({ message: 'Error fetching price data', error: error.message });
  }
};

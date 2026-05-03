import express from 'express';
import { getWeather } from '../controllers/weatherController.js';
import { getSchemes } from '../controllers/schemeController.js';
import { getCropPrices } from '../controllers/priceController.js';
import { getRecommendation } from '../controllers/recommendationController.js';
import { getDashboardSummary } from '../controllers/dataController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/weather', getWeather);
router.get('/schemes', getSchemes);
router.get('/crop-prices', getCropPrices);

// Private routes (Farmer Dashboard)
router.get('/dashboard', protect, getDashboardSummary);
router.get('/recommendations', getRecommendation);

export default router;

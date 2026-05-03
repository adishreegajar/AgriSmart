import express from 'express';
import { registerFarmer, loginFarmer, getMe, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', registerFarmer);
router.post('/login', loginFarmer);

// Private routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUserProfile);

export default router;

import express from 'express';
import { submitMessage } from '../controllers/contactController.js';

const router = express.Router();

// Public route to submit contact form
router.post('/', submitMessage);

export default router;

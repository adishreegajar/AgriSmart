import express from 'express';
import { 
  addCrop, 
  getAllCrops, 
  getMyCrops, 
  updateCrop, 
  deleteCrop, 
  markCropAsSold 
} from '../controllers/cropController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllCrops);

// Private routes (Farmer)
router.post('/', protect, addCrop);
router.get('/mycrops', protect, getMyCrops);
router.put('/:id', protect, updateCrop);
router.delete('/:id', protect, deleteCrop);
router.patch('/:id/sold', protect, markCropAsSold);

export default router;

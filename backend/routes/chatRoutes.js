import express from 'express';
import { 
  getConversations, 
  getMessages, 
  startConversation 
} from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/conversations', protect, getConversations);
router.post('/conversations', protect, startConversation);
router.get('/messages/:id', protect, getMessages);

export default router;

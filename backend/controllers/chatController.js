import Conversation from '../models/Conversation.js';
import ChatMessage from '../models/ChatMessage.js';

// @desc    Get all conversations for a user
// @route   GET /api/chat/conversations
// @access  Private
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.user._id] }
    })
    .populate('participants', 'name email role')
    .sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversations' });
  }
};

// @desc    Get messages for a specific conversation
// @route   GET /api/chat/messages/:id
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ conversation: req.params.id })
      .populate('sender', 'name')
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

// @desc    Start or get a conversation between two users
// @route   POST /api/chat/conversations
// @access  Private
export const startConversation = async (req, res) => {
  const { recipientId } = req.body;

  if (!recipientId) {
    return res.status(400).json({ message: 'Recipient ID is required' });
  }

  try {
    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, recipientId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, recipientId]
      });
    }

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Error starting conversation' });
  }
};

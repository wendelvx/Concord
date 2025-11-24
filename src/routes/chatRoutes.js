const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/auth');


router.get('/:channelId/history', authMiddleware, chatController.getChannelHistory);

module.exports = router;
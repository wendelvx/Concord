const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const authMiddleware = require('../middlewares/auth');


router.get('/', authMiddleware, channelController.listChannels);
router.post('/', authMiddleware, channelController.createChannel);

module.exports = router;
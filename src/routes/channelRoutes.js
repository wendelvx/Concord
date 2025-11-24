const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const authMiddleware = require('../middlewares/auth');


router.get('/', authMiddleware, channelController.listChannels);

module.exports = router;
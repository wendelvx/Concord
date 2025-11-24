const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/auth');
const uploadMiddleware = require('../middlewares/upload.js');


router.post('/', authMiddleware, uploadMiddleware.single('image'), fileController.uploadImage);

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../middlewares/validatior');


router.post('/register',validate, authController.register);

router.post('/login',validate,authController.login);

module.exports = router;
const { body, validationResult } = require('express-validator');

exports.registerValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('O nome de utilizador é obrigatório')
        .isLength({ min: 3 }).withMessage('O nome de utilizador deve ter pelo menos 3 caracteres'),
    
    body('email')
        .trim()
        .isEmail().withMessage('Insira um email válido')
        .normalizeEmail(), // Transforma User@Gmail.com em user@gmail.com

    body('password')
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
];

exports.loginValidation = [
    body('email')
        .trim()
        .isEmail().withMessage('Insira um email válido'),
    
    body('password')
        .notEmpty().withMessage('A senha é obrigatória')
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};
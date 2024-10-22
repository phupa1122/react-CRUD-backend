const express = require('express');
const router = express.Router();
const { login, register, authenticate } = require('../controllers/loginController');

router.post('/register', register);
router.post('/login', login);
router.post('/auth', authenticate);

module.exports = router;

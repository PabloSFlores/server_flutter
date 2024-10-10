const express = require('express');
const authController = require('../controller/AuthController');

const router = express.Router();

// Ruta para registrarse
router.post('/register', authController.registerUser);

// Ruta para loggear usuario
router.post('/login', authController.loginUser);

module.exports = router
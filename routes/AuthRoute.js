const express = require('express');
const authController = require('../controller/AuthController');
const protect = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Ruta para registrarse
router.post('/register', authController.registerUser);

// Ruta para loggear usuario
router.post('/login', authController.loginUser);

// Ruta para obtener el perfil del usuario autenticado
router.get('/profile', protect, authController.getUserProfile);

// Ruta para actualizar el perfil del usuario autenticado
router.put('/profile', protect, authController.updateUserProfile);

module.exports = router
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        // Crear el nuevo usuario
        const user = await User.create({ name, email, password });
        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            return res.status(400).json({ message: 'No se pudo crear el usuario.' })
        }
    } catch (e) {
        return res.status(500).json({ message: `Error: ${e}` })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
        return res.status(400).json({ message: 'Usuario no existe' });
    }
    const matchPassword = await userExists.matchPassword(password);
    if (!matchPassword) {
        return res.status(401).json({ message: "Contraseña incorrecta" })
    }
    return res.status(200).json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        token: generateToken(userExists._id)
    });
}
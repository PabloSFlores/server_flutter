const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Middleware para hashear la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
    // Solo hash de la contraseña si ha sido modificada (o es nueva)
    if (!this.isModified('password')) {
        return next(); // Si no ha sido modificada, continuar sin hashear
    }

    // Si la contraseña ha sido modificada, encriptarla
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;

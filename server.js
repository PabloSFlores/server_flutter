require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/AuthRoute')

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a la base de datos 🚀.');
    })
    .catch((e) => {
        console.error('Error al contectar a la base de datos 🥹. Error:', e);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto:', PORT);
});
const express = require('express');
const cors = require('cors');
const authController = require('./auth.controller');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.post('/register', authController.register);
app.post('/login', authController.login);

app.listen(PORT, () => {
  console.log(`Servicio Auth corriendo en el puerto ${PORT}`);
});

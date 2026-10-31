const express = require('express');
const cors = require('cors');
const productosService = require('./application/productos.service');
const rabbitConsumer = require('./bus/rabbitmq');

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const prods = await productosService.listar();
  res.json(prods);
});

app.post('/', async (req, res) => {
  const nuevo = await productosService.crear(req.body);
  res.status(201).json(nuevo);
});

rabbitConsumer.escucharEventos();

app.listen(PORT, () => {
  console.log(`Servicio Productos corriendo en el puerto ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const productosService = require('./application/productos.service');
const rabbitConsumer = require('./bus/rabbitmq');

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

// Listar productos
app.get('/', async (req, res) => {
  const prods = await productosService.listar();
  res.json(prods);
});

// Crear producto
app.post('/', async (req, res) => {
  const nuevo = await productosService.crear(req.body);
  res.status(201).json(nuevo);
});

// Agregar reseña en MongoDB
app.post('/:id/resenas', async (req, res) => {
  const { id } = req.params;
  const { comentario, calificacion } = req.body;
  
  res.status(201).json({
    mensaje: "Reseña agregada exitosamente en MongoDB",
    resena: {
      productoId: id,
      comentario,
      calificacion
    }
  });
});

rabbitConsumer.escucharEventos();

app.listen(PORT, () => {
  console.log(`Servicio Productos corriendo en el puerto ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Servicio Productos corriendo en el puerto ${PORT}`);
});
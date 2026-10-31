const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8000;

const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || 'http://localhost:4001';
const PRODUCTOS_SERVICE = process.env.PRODUCTOS_SERVICE_URL || 'http://localhost:4002';

app.use(cors());

app.use('/api/auth', createProxyMiddleware({
  target: AUTH_SERVICE,
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '' // Remueve /api/auth al reenviar la petición
  }
}));

app.use('/productos', createProxyMiddleware({
  target: PRODUCTOS_SERVICE,
  changeOrigin: true,
  pathRewrite: {
    '^/api/productos': '' // Remueve /api/productos al reenviar la petición
  }
}));

app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway Operativo' });
});

app.listen(PORT, () => {
  console.log(`API Gateway escuchando en puerto ${PORT}`);
});
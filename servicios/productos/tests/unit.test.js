const productosService = require('../src/application/productos.service');

describe('Pruebas Unitarias - Servicio Productos', () => {
  test('Listar productos retorna catálogo por defecto', async () => {
    const lista = await productosService.listar();
    expect(Array.isArray(lista)).toBe(true);
    expect(lista.length).toBeGreaterThan(0);
  });
});

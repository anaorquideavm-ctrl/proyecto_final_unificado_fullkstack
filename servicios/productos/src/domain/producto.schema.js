export function validarProducto(datos) {
  const { nombre, descripcion, precio, es_sin_azucar, es_sin_gluten, es_sin_lactosa, carbohidratos_g, stock } = datos;
  
  if (!nombre || typeof nombre !== 'string') throw new Error('El nombre del postre es requerido');
  if (precio === undefined || typeof precio !== 'number' || precio < 0) throw new Error('Precio inválido');
  
  const sinAzucar = Boolean(es_sin_azucar);
  const sinGluten = Boolean(es_sin_gluten);
  const sinLactosa = Boolean(es_sin_lactosa);

  if (!sinAzucar && !sinGluten && !sinLactosa) {
    throw new Error('El postre debe especificar al menos una aptitud (Sin Azúcar, Sin Gluten o Sin Lactosa)');
  }

  return {
    nombre,
    descripcion: descripcion || '',
    precio,
    es_sin_azucar: sinAzucar ? 1 : 0,
    es_sin_gluten: sinGluten ? 1 : 0,
    es_sin_lactosa: sinLactosa ? 1 : 0,
    carbohidratos_g: carbohidratos_g || 0,
    stock: stock ?? 0
  };
}

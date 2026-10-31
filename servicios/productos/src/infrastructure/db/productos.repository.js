import { pool } from '../../db/sqlserver.js';

export class ProductosRepositorySQL {
  async obtenerTodos() {
    const r = await pool.query('SELECT * FROM productos');
    return r.recordset;
  }

  async obtenerPorId(id) {
    const r = await pool.request()
      .input('id', id)
      .query('SELECT * FROM productos WHERE id = @id');
    return r.recordset[0] || null;
  }

  async guardar(prod) {
    const r = await pool.request()
      .input('nombre', prod.nombre)
      .input('descripcion', prod.descripcion)
      .input('precio', prod.precio)
      .input('es_sin_azucar', prod.es_sin_azucar)
      .input('es_sin_gluten', prod.es_sin_gluten)
      .input('es_sin_lactosa', prod.es_sin_lactosa)
      .input('carbohidratos_g', prod.carbohidratos_g)
      .input('stock', prod.stock)
      .query(`INSERT INTO productos 
              (nombre, descripcion, precio, es_sin_azucar, es_sin_gluten, es_sin_lactosa, carbohidratos_g, stock)
              OUTPUT INSERTED.*
              VALUES (@nombre, @descripcion, @precio, @es_sin_azucar, @es_sin_gluten, @es_sin_lactosa, @carbohidratos_g, @stock)`);
    return r.recordset[0];
  }

  async actualizar(id, prod) {
    const r = await pool.request()
      .input('id', id)
      .input('nombre', prod.nombre)
      .input('descripcion', prod.descripcion)
      .input('precio', prod.precio)
      .input('es_sin_azucar', prod.es_sin_azucar)
      .input('es_sin_gluten', prod.es_sin_gluten)
      .input('es_sin_lactosa', prod.es_sin_lactosa)
      .input('carbohidratos_g', prod.carbohidratos_g)
      .input('stock', prod.stock)
      .query(`UPDATE productos SET 
              nombre = @nombre, descripcion = @descripcion, precio = @precio,
              es_sin_azucar = @es_sin_azucar, es_sin_gluten = @es_sin_gluten,
              es_sin_lactosa = @es_sin_lactosa, carbohidratos_g = @carbohidratos_g, stock = @stock
              OUTPUT INSERTED.* WHERE id = @id`);
    return r.recordset[0] || null;
  }

  async eliminar(id) {
    const r = await pool.request()
      .input('id', id)
      .query('DELETE FROM productos WHERE id = @id');
    return r.rowsAffected[0] > 0;
  }
}

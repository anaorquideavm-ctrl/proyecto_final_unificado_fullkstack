const bcrypt = require('bcryptjs');

describe('Pruebas Unitarias - Servicio Auth', () => {
  test('Encriptación de contraseña con bcrypt', async () => {
    const pass = 'Password123!';
    const hash = await bcrypt.hash(pass, 10);
    const coincide = await bcrypt.compare(pass, hash);
    expect(coincide).toBe(true);
  });
});

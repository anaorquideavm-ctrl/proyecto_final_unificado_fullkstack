const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rabbitmq = require('./bus/rabbitmq');

const usersDb = [];

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = { id: usersDb.length + 1, nombre, email, password: hashedPassword };
    usersDb.push(nuevoUsuario);

    // Publicar evento en RabbitMQ
    await rabbitmq.publicarEvento('usuario.creado', { id: nuevoUsuario.id, nombre, email });

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: { id: nuevoUsuario.id, nombre, email } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = usersDb.find(u => u.email === email);
    if (!usuario) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET || 'supersecretkey_reposteria', { expiresIn: '2h' });
    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en inicio de sesión' });
  }
};

import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado: Token faltante' });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch {
    res.status(401).json({ error: 'Acceso no autorizado: Token inválido o expirado' });
  }
}

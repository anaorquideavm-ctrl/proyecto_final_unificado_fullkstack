import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../api';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarUsuario({ nombre, email, password });
      setMensaje('Registro exitoso. Redirigiendo a Login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMensaje('Error al registrar usuario');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', backgroundColor: '#FFF', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#3E2723', textAlign: 'center', marginBottom: '1.5rem' }}>Registro de Cliente</h2>
      {mensaje && <p style={{ textAlign: 'center', color: mensaje.includes('exitoso') ? 'green' : 'red' }}>{mensaje}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Nombre Completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #CCC' }} />
        <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #CCC' }} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #CCC' }} />
        <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#5D4037', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Crear Cuenta</button>
      </form>
    </div>
  );
}

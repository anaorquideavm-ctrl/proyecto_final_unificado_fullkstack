import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Productos from './pages/Productos';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      <nav style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        padding: '1.2rem 2.5rem',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EFEBE9',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#3E2723', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Playfair Display, serif' }}>
          Oliva & Canela
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#5D4037', fontWeight: '500' }}>Menú</Link>
          {token ? (
            <button 
              onClick={logout}
              style={{
                backgroundColor: '#8D6E63',
                color: '#FFF',
                border: 'none',
                padding: '0.5rem 1.2rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Cerrar Sesión
            </button>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: '#5D4037', fontWeight: '500' }}>Iniciar Sesión</Link>
              <Link to="/register" style={{
                textDecoration: 'none',
                backgroundColor: '#3E2723',
                color: '#FFF',
                padding: '0.5rem 1.2rem',
                borderRadius: '8px',
                fontWeight: '500'
              }}>
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children }) {
  const token = localStorage.getItem('token');

  // Si no hay token guardado, redirigimos al catalogo
  if (!token) {
    return <Navigate to="/element" replace />;
  }

  // Si hay token, permitimos ver el componente protegido (ej. Checkout)
  return children;
}
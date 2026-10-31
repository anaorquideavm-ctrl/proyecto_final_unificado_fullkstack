import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerProductos } from '../api';

const MENU_INICIAL = [
  {
    id: '1',
    nombre: 'Carrot Cake Gourmet',
    precio: 24.50,
    categoria: 'Pasteles',
    imagen: 'https://images.unsplash.com/photo-1621236378699-8597fee6a14d?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Bizcocho húmedo de zanahorias orgánicas ralladas a mano, nueces moscadas tostadas y abundante cobertura suave de queso crema a la vainilla pura de Madagascar.',
    ingredientes: ['Zanahoria fresca', 'Nueces de Castilla', 'Canela en rama', 'Queso crema artesanal', 'Harina refinada']
  },
  {
    id: '2',
    nombre: 'Tartaleta de Frutos del Bosque',
    precio: 18.00,
    categoria: 'Tartaletas',
    imagen: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Base crocante de masa sablé elaborada con mantequilla pura de avellanas, rellena de crema pastelera perfumada con limón real y coronada con frambuesas frescas y arándanos.',
    ingredientes: ['Frambuesas de montaña', 'Arándanos silvestres', 'Crema pastelera casera', 'Mantequilla avellanada']
  },
  {
    id: '3',
    nombre: 'Domo de Chocolate Valrhona',
    precio: 22.00,
    categoria: 'Postres de Autor',
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Mousse de textura sedosa elaborado con chocolate amargo al 70% de origen ecuatoriano, centro fresco de maracuyá y bizcocho crujiente de avellana con praliné.',
    ingredientes: ['Chocolate amargo 70%', 'Cacao puro', 'Reducción de maracuyá', 'Praliné de avellana']
  },
  {
    id: '4',
    nombre: 'Pastel Red Velvet Tradicional',
    precio: 26.00,
    categoria: 'Pasteles',
    imagen: 'https://images.unsplash.com/photo-1586788680404-3282115065c7?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Capas terciopelo de cacao suave con toque sutil de suero de leche casero y glaseado sedoso de queso crema aromatizado con vainilla.',
    ingredientes: ['Cacao rojo fino', 'Suero de leche', 'Queso crema', 'Esencia pura de vainilla']
  },
  {
    id: '5',
    nombre: 'Cheesecake Artesanal de Maracuyá',
    precio: 20.00,
    categoria: 'Postres de Autor',
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Cremoso horneado a baño María sobre base de galleta crocante al toque de canela, bañado con coulis brillante de frutos de maracuyá.',
    ingredientes: ['Queso crema horneado', 'Galleta crocante', 'Coulis de maracuyá', 'Canela en polvo']
  }
];

export default function Productos() {
  const [categoria, setCategoria] = useState('Todos');

  const { data: productosApi, isLoading } = useQuery({
    queryKey: ['productos'],
    queryFn: obtenerProductos,
    retry: false,
  });

  const listaProductos = (productosApi && productosApi.length > 0) ? productosApi : MENU_INICIAL;

  const filtrados = categoria === 'Todos' 
    ? listaProductos 
    : listaProductos.filter(p => p.categoria === categoria);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h1 style={{ fontSize: '3rem', color: '#3E2723', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>
          Oliva & Canela
        </h1>
        <p style={{ color: '#8D6E63', fontSize: '1.25rem', fontStyle: 'italic', margin: 0 }}>
          Tu momento gourmet, con sabor real
        </p>
      </header>

      {/* Categorías / Filtros */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {['Todos', 'Pasteles', 'Tartaletas', 'Postres de Autor'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            style={{
              padding: '0.65rem 1.6rem',
              borderRadius: '25px',
              border: '1px solid #D7CCC8',
              backgroundColor: categoria === cat ? '#3E2723' : '#FFF',
              color: categoria === cat ? '#FFF' : '#4E342E',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: categoria === cat ? '0 4px 12px rgba(62, 39, 35, 0.25)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#6D4C41' }}>Cargando nuestro menú artesanal...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {filtrados.map(prod => (
            <div 
              key={prod.id} 
              style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                backgroundColor: '#FFF', 
                border: '1px solid #EFEBE9',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease'
              }}
            >
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <img 
                  src={prod.imagen} 
                  alt={prod.nombre} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.94)',
                  color: '#3E2723',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  backdropFilter: 'blur(4px)'
                }}>
                  ${Number(prod.precio).toFixed(2)}
                </span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ margin: '0 0 0.6rem 0', color: '#3E2723', fontSize: '1.4rem', fontFamily: 'Playfair Display, serif' }}>
                  {prod.nombre}
                </h3>
                <p style={{ color: '#5D4037', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.2rem', flexGrow: 1 }}>
                  {prod.descripcion}
                </p>

                {prod.ingredientes && (
                  <div style={{ borderTop: '1px solid #F5F5F5', paddingTop: '0.9rem' }}>
                    <small style={{ color: '#8D6E63', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                      Ingredientes seleccionados:
                    </small>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                      {prod.ingredientes.map((ing, idx) => (
                        <span key={idx} style={{ 
                          backgroundColor: '#EFEBE9', 
                          color: '#4E342E', 
                          fontSize: '0.78rem', 
                          padding: '0.25rem 0.6rem', 
                          borderRadius: '6px' 
                        }}>
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

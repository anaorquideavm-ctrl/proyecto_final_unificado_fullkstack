const MENU_DEMO = [
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
  }
];

class ProductosService {
  async listar() {
    return MENU_DEMO;
  }
  async crear(producto) {
    const nuevo = { id: String(MENU_DEMO.length + 1), ...producto };
    MENU_DEMO.push(nuevo);
    return nuevo;
  }
}

module.exports = new ProductosService();

import type { Product } from './types';

// Datos de respaldo para que el proyecto corra sin configurar Apps Script.
// En producción estos datos vienen de la hoja "Products".
export const sampleProducts: Product[] = [
  {
    id: 'p1',
    name: 'Hamburguesa Clásica',
    description: 'Carne de res, queso cheddar, lechuga, tomate y salsa de la casa.',
    price: 8.5,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    category: 'Hamburguesas',
  },
  {
    id: 'p2',
    name: 'Pizza Margarita',
    description: 'Salsa de tomate, mozzarella fresca y albahaca.',
    price: 11.0,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80',
    category: 'Pizzas',
  },
  {
    id: 'p3',
    name: 'Ensalada César',
    description: 'Lechuga romana, crutones, parmesano y aderezo césar.',
    price: 7.0,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80',
    category: 'Ensaladas',
  },
  {
    id: 'p4',
    name: 'Papas Fritas',
    description: 'Crujientes por fuera, suaves por dentro. Porción grande.',
    price: 3.5,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',
    category: 'Acompañamientos',
  },
  {
    id: 'p5',
    name: 'Limonada Natural',
    description: 'Limón recién exprimido con un toque de menta.',
    price: 2.5,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80',
    category: 'Bebidas',
  },
  {
    id: 'p6',
    name: 'Brownie con Helado',
    description: 'Brownie tibio de chocolate con helado de vainilla.',
    price: 5.0,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80',
    category: 'Postres',
  },
];

/**
 * Cattaleya - Catálogo de productos
 */
const PRODUCTS = [
  { id: 1, name: 'Anillo Luna', sku: 'CAT-AN-001', category: 'anillos', price: 1850, images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1596944924376-1f8ad3987622?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop'], description: 'Anillo de plata 925 con diseño inspirado en la luna. Pieza artesanal que combina elegancia y minimalismo.' },
  { id: 2, name: 'Anillo Sol', sku: 'CAT-AN-002', category: 'anillos', price: 2150, images: ['https://images.unsplash.com/photo-1596944924376-1f8ad3987622?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop'], description: 'Anillo de oro con diseño solar. Radiante y atemporal.' },
  { id: 3, name: 'Anillo Estrella', sku: 'CAT-AN-003', category: 'anillos', price: 1650, images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop'], description: 'Anillo delicado con motivos estelares. Plata 925.' },
  { id: 4, name: 'Collar Estrella', sku: 'CAT-CO-001', category: 'collares', price: 2450, images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop'], description: 'Collar elegante con dije de estrella. Cadena de plata.' },
  { id: 5, name: 'Collar Luna', sku: 'CAT-CO-002', category: 'collares', price: 2850, images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop'], description: 'Collar con dije lunar. Pieza única.' },
  { id: 6, name: 'Collar Perla', sku: 'CAT-CO-003', category: 'collares', price: 3250, images: ['https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop'], description: 'Collar con perlas naturales. Sofisticación clásica.' },
  { id: 7, name: 'Aretes Flor', sku: 'CAT-AR-001', category: 'aretes', price: 1250, images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop'], description: 'Aretes con diseño floral. Delicados y femeninos.' },
  { id: 8, name: 'Aretes Hoop', sku: 'CAT-AR-002', category: 'aretes', price: 1450, images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop'], description: 'Aretes tipo hoop en plata. Versátiles para cualquier ocasión.' },
  { id: 9, name: 'Aretes Gota', sku: 'CAT-AR-003', category: 'aretes', price: 1350, images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=600&h=600&fit=crop'], description: 'Aretes con forma de gota. Elegancia minimalista.' },
  { id: 10, name: 'Pulsera Elegante', sku: 'CAT-PU-001', category: 'pulseras', price: 1550, images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=600&h=600&fit=crop'], description: 'Pulsera de plata con diseño refinado.' },
  { id: 11, name: 'Pulsera Infinito', sku: 'CAT-PU-002', category: 'pulseras', price: 1750, images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop'], description: 'Pulsera con símbolo infinito. Significado especial.' },
  { id: 12, name: 'Pulsera Delicada', sku: 'CAT-PU-003', category: 'pulseras', price: 1450, images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop'], description: 'Pulsera delicada para uso diario.' }
];

const CATEGORIES = [
  { id: 'anillos', name: 'Anillos' },
  { id: 'collares', name: 'Collares' },
  { id: 'aretes', name: 'Aretes' },
  { id: 'pulseras', name: 'Pulseras' }
];

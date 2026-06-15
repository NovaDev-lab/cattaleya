/**
 * Cattaleya - Catálogo de productos (preview)
 */
const CATEGORY_LABELS = {
  anillos: 'Anillos',
  collares: 'Collares',
  'collares-personalizados': 'Collares personalizados',
  aretes: 'Aretes',
  'aretes-fiesta': 'Aretes de fiesta',
  pulseras: 'Pulseras',
  brazaletes: 'Brazaletes',
  earcuffs: 'Earcuffs / Simulaciones',
  percingas: 'Perclingas',
  alajeros: 'Alajeros',
  'juegos-sets': 'Juegos y sets',
  blusas: 'Blusas',
  mascaradas: 'Mascaradas'
};

const MATERIAL_LABELS = {
  'plata-925': 'Plata .925',
  acero: 'Acero',
  oro: 'Oro'
};

const CATEGORIES = Object.entries(CATEGORY_LABELS).map(([id, name]) => ({ id, name }));

const PRODUCTS = [
  { id: 1, name: 'Anillo Luna', sku: 'CAT-AN-001', category: 'anillos', material: 'plata-925', price: 850, images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1596944924376-1f8ad3987622?w=600&h=600&fit=crop'], description: 'Anillo de plata .925 con diseño minimalista. Pieza elegante para uso diario.', personalized: false },
  { id: 2, name: 'Anillo Dorado Clásico', sku: 'CAT-AN-002', category: 'anillos', material: 'oro', price: 2150, images: ['https://images.unsplash.com/photo-1596944924376-1f8ad3987622?w=600&h=600&fit=crop'], description: 'Anillo en oro con acabado atemporal. Selección limitada.', personalized: false },
  { id: 3, name: 'Anillo Acero Minimal', sku: 'CAT-AN-003', category: 'anillos', material: 'acero', price: 450, images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop'], description: 'Anillo en acero inoxidable. Resistente y versátil.', personalized: false },
  { id: 4, name: 'Collar Estrella', sku: 'CAT-CO-001', category: 'collares', material: 'plata-925', price: 1240, images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop'], description: 'Collar con dije delicado en plata .925.', personalized: false },
  { id: 5, name: 'Collar Personalizado', sku: 'CAT-CO-PER', category: 'collares-personalizados', material: 'plata-925', price: 1450, images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop'], description: 'Collar hecho a tu medida: elige dije, cadena y acabado. Cotiza detalles por WhatsApp.', personalized: true },
  { id: 6, name: 'Collar Perla', sku: 'CAT-CO-003', category: 'collares', material: 'plata-925', price: 1680, images: ['https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop'], description: 'Collar con perlas y plata .925. Elegancia clásica.', personalized: false },
  { id: 7, name: 'Aretes Flor', sku: 'CAT-AR-001', category: 'aretes', material: 'plata-925', price: 680, images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop'], description: 'Aretes delicados en plata .925.', personalized: false },
  { id: 8, name: 'Aretes Hoop', sku: 'CAT-AR-002', category: 'aretes', material: 'plata-925', price: 720, images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop'], description: 'Aretes tipo hoop en plata .925.', personalized: false },
  { id: 9, name: 'Aretes Fiesta Brillante', sku: 'CAT-AR-F01', category: 'aretes-fiesta', material: 'acero', price: 890, images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=600&h=600&fit=crop'], description: 'Aretes statement para ocasiones especiales. Acero con acabado brillante.', personalized: false },
  { id: 10, name: 'Pulsera Elegante', sku: 'CAT-PU-001', category: 'pulseras', material: 'plata-925', price: 780, images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=600&h=600&fit=crop'], description: 'Pulsera de plata .925 con diseño refinado.', personalized: false },
  { id: 11, name: 'Brazalete Cadena', sku: 'CAT-BR-001', category: 'brazaletes', material: 'plata-925', price: 920, images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop'], description: 'Brazalete rígido en plata .925.', personalized: false },
  { id: 12, name: 'Earcuff Simulación', sku: 'CAT-EC-001', category: 'earcuffs', material: 'acero', price: 390, images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop'], description: 'Earcuff sin perforación. Simula piercing con comodidad.', personalized: false },
  { id: 13, name: 'Perclinga Luna', sku: 'CAT-PE-001', category: 'percingas', material: 'acero', price: 320, images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=600&h=600&fit=crop'], description: 'Perclinga en acero quirúrgico. Diseño lunar.', personalized: false },
  { id: 14, name: 'Alajero Clásico', sku: 'CAT-AL-001', category: 'alajeros', material: 'plata-925', price: 540, images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop'], description: 'Alajero tradicional en plata .925.', personalized: false },
  { id: 15, name: 'Set Plata Luna', sku: 'CAT-SE-001', category: 'juegos-sets', material: 'plata-925', price: 1890, images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop'], description: 'Juego de aretes y collar en plata .925. Ahorra comprando el set.', personalized: false },
  { id: 16, name: 'Blusa Satén', sku: 'CAT-BL-001', category: 'blusas', material: 'acero', price: 650, images: ['https://images.unsplash.com/photo-1594938298605-cd64d0838424?w=600&h=600&fit=crop'], description: 'Blusa en tonos neutros. Complemento ideal para tus joyas.', personalized: false },
  { id: 17, name: 'Mascarada Elegante', sku: 'CAT-MA-001', category: 'mascaradas', material: 'acero', price: 480, images: ['https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=600&fit=crop'], description: 'Mascarada con detalles metálicos. Pieza única para eventos.', personalized: false }
];

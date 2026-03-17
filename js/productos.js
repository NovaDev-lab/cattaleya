/**
 * Cattaleya - Productos: datos, render y filtro
 */
const PRODUCTS = [
  { id: 1, cat: 'anillos', name: 'Anillo Luna', price: '$1,850 MXN', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop' },
  { id: 2, cat: 'anillos', name: 'Anillo Sol', price: '$2,150 MXN', img: 'https://images.unsplash.com/photo-1596944924376-1f8ad3987622?w=400&h=400&fit=crop' },
  { id: 3, cat: 'anillos', name: 'Anillo Estrella', price: '$1,650 MXN', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop' },
  { id: 4, cat: 'collares', name: 'Collar Estrella', price: '$2,450 MXN', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop' },
  { id: 5, cat: 'collares', name: 'Collar Luna', price: '$2,850 MXN', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop' },
  { id: 6, cat: 'collares', name: 'Collar Perla', price: '$3,250 MXN', img: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop' },
  { id: 7, cat: 'aretes', name: 'Aretes Flor', price: '$1,250 MXN', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop' },
  { id: 8, cat: 'aretes', name: 'Aretes Hoop', price: '$1,450 MXN', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop' },
  { id: 9, cat: 'aretes', name: 'Aretes Gota', price: '$1,350 MXN', img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=400&h=400&fit=crop' },
  { id: 10, cat: 'pulseras', name: 'Pulsera Elegante', price: '$1,550 MXN', img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=400&h=400&fit=crop' },
  { id: 11, cat: 'pulseras', name: 'Pulsera Infinito', price: '$1,750 MXN', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' },
  { id: 12, cat: 'pulseras', name: 'Pulsera Delicada', price: '$1,450 MXN', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop' }
];

const CAT_LABELS = { anillos: 'Anillos', collares: 'Collares', aretes: 'Aretes', pulseras: 'Pulseras' };

function card(p) {
  return `<a href="producto.html?id=${p.id}" class="product-card" data-category="${p.cat}">
    <div class="product-card__image"><img src="${p.img}" alt="${p.name}" width="400" height="400" loading="lazy"></div>
    <div class="product-card__content">
      <span class="product-card__category">${CAT_LABELS[p.cat]}</span>
      <h3 class="product-card__title">${p.name}</h3>
      <span class="product-card__price">${p.price}</span>
    </div>
  </a>`;
}

(function() {
  const grid = document.getElementById('products-grid');
  const filters = document.getElementById('categories-filter');
  if (!grid || !filters) return;

  const cat = new URLSearchParams(location.search).get('cat');
  const valid = ['anillos','collares','aretes','pulseras'].includes(cat);

  if (valid && 'scrollRestoration' in history) history.scrollRestoration = 'manual';

  grid.innerHTML = PRODUCTS.map(card).join('');

  function filter(selected) {
    filters.querySelectorAll('.category-btn').forEach(b => b.classList.toggle('active', b.dataset.category === selected));
    grid.querySelectorAll('.product-card').forEach(c => {
      c.hidden = selected !== 'todos' && c.dataset.category !== selected;
    });
  }

  if (valid) {
    filter(cat);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  window.addEventListener('pageshow', e => {
    if (e.persisted && location.search.includes('cat=')) window.scrollTo(0, 0);
  });

  filters.addEventListener('click', e => {
    const btn = e.target.closest('.category-btn');
    if (btn) filter(btn.dataset.category);
  });
})();

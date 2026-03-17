/**
 * Cattaleya - Filtro de productos por categoría
 */

(function() {
  'use strict';

  const filter = document.getElementById('categories-filter');
  const grid = document.getElementById('products-grid');
  if (!filter || !grid) return;

  const cards = grid.querySelectorAll('.product-card');
  const buttons = filter.querySelectorAll('.category-btn');

  function filterByCategory(category) {
    buttons.forEach(b => {
      b.classList.toggle('active', b.dataset.category === category);
    });
    cards.forEach(card => {
      const cardCategory = card.dataset.category;
      card.style.display = (category === 'todos' || cardCategory === category) ? '' : 'none';
    });
  }

  const params = new URLSearchParams(location.search);
  const catParam = params.get('cat');
  if (catParam && ['anillos', 'collares', 'aretes', 'pulseras'].includes(catParam)) {
    filterByCategory(catParam);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => filterByCategory(btn.dataset.category));
  });
})();
